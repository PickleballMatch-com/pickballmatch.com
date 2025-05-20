import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { router } from '../../trpc';
import { protectedProcedure, publicProcedure } from '../../trpc';
import { TRPCError } from '@trpc/server';
import { users, playerProfiles } from '../../db/schema';
import { debugLog } from '../../debug-log';

export const profilesRouter = router({
  // Get the current user's profile
  getCurrent: protectedProcedure.query(async ({ ctx }) => {
    const clerkId = ctx.auth?.userId;
    if (!clerkId) {
      debugLog('profiles.getCurrent', 'No user ID found in auth context');
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'User not authenticated'
      });
    }
    debugLog('profiles.getCurrent', `Getting profile for user: ${clerkId}`);
    
    try {
      // Get user from database
      const user = await ctx.db.query.users.findFirst({
        where: eq(users.id, clerkId),
      });
      
      debugLog('profiles.getCurrent', 'User data from DB:', user);
      
      // Get player profile if it exists
      const playerProfile = user
        ? await ctx.db.query.playerProfiles.findFirst({
            where: eq(playerProfiles.userId, user.id),
          })
        : null;
      
      debugLog('profiles.getCurrent', 'Player profile from DB:', playerProfile);
      
      // Prepare the response in a safe format
      const response = {
        user: user ? {
          ...user,
          createdAt: user.createdAt instanceof Date ? user.createdAt.toISOString() : user.createdAt,
          updatedAt: user.updatedAt instanceof Date ? user.updatedAt.toISOString() : user.updatedAt,
          lastActive: user.lastActive instanceof Date ? user.lastActive.toISOString() : user.lastActive,
        } : null,
        playerProfile: playerProfile ? {
          ...playerProfile,
          // Ensure dates are serialized as ISO strings
          updatedAt: playerProfile.updatedAt instanceof Date ? playerProfile.updatedAt.toISOString() : playerProfile.updatedAt,
          // Ensure arrays are properly handled
          strengths: Array.isArray(playerProfile.strengths) ? playerProfile.strengths : [],
          weaknesses: Array.isArray(playerProfile.weaknesses) ? playerProfile.weaknesses : [],
          gameplayVideos: Array.isArray(playerProfile.gameplayVideos) ? playerProfile.gameplayVideos : [],
          equipmentIds: Array.isArray(playerProfile.equipmentIds) ? playerProfile.equipmentIds : [],
          matchTypes: Array.isArray(playerProfile.matchTypes) ? playerProfile.matchTypes : [],
        } : null,
      };
      
      debugLog('profiles.getCurrent', 'Response data to client:', response);
      return response;
    } catch (error) {
      debugLog('profiles.getCurrent', 'Error getting profile:', error);
      throw error;
    }
  }),
  
  // Get a user's profile by ID
  getById: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.query.users.findFirst({
        where: eq(users.id, input.userId),
      });
      
      const playerProfile = user
        ? await ctx.db.query.playerProfiles.findFirst({
            where: eq(playerProfiles.userId, user.id),
          })
        : null;
      
      return {
        user,
        playerProfile,
      };
    }),
  
  // Create or update user profile from Clerk
  syncFromClerk: protectedProcedure
    .input(
      z.object({
        firstName: z.string().default('').optional(),
        lastName: z.string().default('').optional(),
        email: z.string().optional().nullable(),
        imageUrl: z.string().optional().nullable(),
      }).optional().default({})
    )
    .mutation(async ({ ctx, input = {} }) => {
      try {
        // Ensure auth context exists and has userId
        if (!ctx.auth) {
          debugLog('profiles.syncFromClerk', 'No auth context available');
          return { success: false, action: 'failed', error: 'No auth context' };
        }

        const clerkId = ctx.auth?.userId;
        if (!clerkId) {
          debugLog('profiles.syncFromClerk', 'No user ID found in auth context');
          return { success: false, action: 'failed', error: 'No user ID' };
        }
        
        debugLog('profiles.syncFromClerk', `Syncing profile for user ${clerkId}`, { input });

        // We already checked clerkId above, this was a duplicate check

        // Extract user info from clerk user object if available
        let firstName = input.firstName || '';
        let lastName = input.lastName || '';
        let email = input.email || '';
        let imageUrl = input.imageUrl || null;

        // If we have ctx.user (from currentUser), use that data to supplement
        if (ctx.user) {
          debugLog('profiles.syncFromClerk', 'Using Clerk currentUser data', ctx.user);
          firstName = firstName || ctx.user.firstName || '';
          lastName = lastName || ctx.user.lastName || '';
          email = email || ctx.user.emailAddresses?.[0]?.emailAddress || `${clerkId}@placeholder.com`;
          imageUrl = imageUrl || ctx.user.imageUrl || null;
        }

        // Check if user already exists
        const existingUser = await ctx.db.query.users.findFirst({
          where: eq(users.id, clerkId),
        });
        
        debugLog('profiles.syncFromClerk', 'Existing user check result:', existingUser);

        if (existingUser) {
          debugLog('profiles.syncFromClerk', `Updating existing user ${clerkId}`);

          // Update existing user
          await ctx.db
            .update(users)
            .set({
              firstName,
              lastName,
              email,
              profileImageUrl: imageUrl,
              updatedAt: new Date(),
            })
            .where(eq(users.id, clerkId));

          debugLog('profiles.syncFromClerk', 'User updated successfully');
          return { success: true, action: 'updated' };
        } else {
          debugLog('profiles.syncFromClerk', `Creating new user ${clerkId}`);

          // Create new user
          const result = await ctx.db.insert(users).values({
            id: clerkId,
            firstName,
            lastName,
            email,
            profileImageUrl: imageUrl,
            createdAt: new Date(),
            updatedAt: new Date(),
          });

          debugLog('profiles.syncFromClerk', 'User created successfully', { result });
          return { success: true, action: 'created' };
        }
      } catch (error) {
        debugLog('profiles.syncFromClerk', 'Error syncing profile:', {
          error: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined
        });
        
        return {
          success: false,
          action: 'failed',
          error: error instanceof Error ? error.message : 'Unknown error'
        };
      }
    }),
  
  // Update player profile with all fields
  updatePlayerProfile: protectedProcedure
    .input(
      z.object({
        skillLevel: z.string().min(1, "Skill level is required"),
        preferredPlayStyle: z.string().optional().nullable(),
        yearsPlaying: z.number().optional().nullable(),
        preferredLocation: z.string().optional().nullable(),
        bio: z.string().optional().nullable(),
        maxTravelDistance: z.number().optional().nullable(),
        isAvailableToPlay: z.boolean().optional().nullable(),
        strengths: z.array(z.string()).optional().nullable().default([]),
        weaknesses: z.array(z.string()).optional().nullable().default([]),
        playingFrequency: z.string().optional().nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        debugLog('profiles.updatePlayerProfile', "Profile update received with input:", input);
        debugLog('profiles.updatePlayerProfile', "Auth context:", ctx.auth);
        
        if (!input) {
          debugLog('profiles.updatePlayerProfile', "No input received for profile update");
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'No profile data provided',
          });
        }
        
        const clerkId = ctx.auth?.userId;
        if (!clerkId) {
          debugLog('profiles.updatePlayerProfile', "No userId in auth context");
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'User not authenticated',
          });
        }
        
        debugLog('profiles.updatePlayerProfile', "Processing update for user ID:", { clerkId });
        
        // Check if player profile exists
        const existingProfile = await ctx.db.query.playerProfiles.findFirst({
          where: eq(playerProfiles.userId, clerkId),
        });
        
        debugLog('profiles.updatePlayerProfile', "Existing profile check result:", existingProfile);
        
        // Prepare data for update/insert
        const profileData = {
          skillLevel: input.skillLevel,
          preferredPlayStyle: input.preferredPlayStyle,
          yearsPlaying: input.yearsPlaying,
          preferredLocation: input.preferredLocation,
          bio: input.bio,
          maxTravelDistance: input.maxTravelDistance,
          isAvailableToPlay: input.isAvailableToPlay,
          strengths: input.strengths || [],
          weaknesses: input.weaknesses || [],
          playingFrequency: input.playingFrequency,
          updatedAt: new Date(),
        };
        
        try {
          // Restore full profile update logic
          if (existingProfile) {
            // Update existing profile
            const updateResult = await ctx.db
              .update(playerProfiles)
              .set(profileData)
              .where(eq(playerProfiles.userId, clerkId));
              
            debugLog('profiles.updatePlayerProfile', "Profile updated successfully", { updateResult });
            
            // Fetch the updated profile to return
            const updatedProfile = await ctx.db.query.playerProfiles.findFirst({
              where: eq(playerProfiles.userId, clerkId),
            });
            
            debugLog('profiles.updatePlayerProfile', "Updated profile:", updatedProfile);
            
            return { 
              success: true, 
              action: 'updated',
              profile: updatedProfile ? {
                ...updatedProfile,
                updatedAt: updatedProfile.updatedAt instanceof Date ? updatedProfile.updatedAt.toISOString() : updatedProfile.updatedAt,
                strengths: Array.isArray(updatedProfile.strengths) ? updatedProfile.strengths : [],
                weaknesses: Array.isArray(updatedProfile.weaknesses) ? updatedProfile.weaknesses : [],
              } : null
            };
          } else {
            // Create new profile
            const insertResult = await ctx.db.insert(playerProfiles).values({
              userId: clerkId,
              ...profileData,
              isAvailableToPlay: input.isAvailableToPlay ?? true,
            });
            
            debugLog('profiles.updatePlayerProfile', "Profile created successfully", { insertResult });
            
            // Fetch the created profile to return
            const createdProfile = await ctx.db.query.playerProfiles.findFirst({
              where: eq(playerProfiles.userId, clerkId),
            });
            
            debugLog('profiles.updatePlayerProfile', "Created profile:", createdProfile);
            
            return { 
              success: true, 
              action: 'created',
              profile: createdProfile ? {
                ...createdProfile,
                updatedAt: createdProfile.updatedAt instanceof Date ? createdProfile.updatedAt.toISOString() : createdProfile.updatedAt,
                strengths: Array.isArray(createdProfile.strengths) ? createdProfile.strengths : [],
                weaknesses: Array.isArray(createdProfile.weaknesses) ? createdProfile.weaknesses : [],
              } : null
            };
          }
        } catch (dbError) {
          debugLog('profiles.updatePlayerProfile', "Database operation error:", {
            error: dbError instanceof Error ? dbError.message : String(dbError),
            stack: dbError instanceof Error ? dbError.stack : undefined
          });
          
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Database operation failed',
            cause: dbError,
          });
        }
      } catch (error) {
        debugLog('profiles.updatePlayerProfile', "Error in updatePlayerProfile:", {
          error: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined
        });
        
        if (error instanceof TRPCError) {
          throw error;
        }
        
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error instanceof Error ? error.message : 'Unknown error updating profile',
          cause: error,
        });
      }
    }),
});
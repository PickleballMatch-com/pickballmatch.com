import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { router } from '../../trpc';
import { protectedProcedure, publicProcedure } from '../../trpc';
import { TRPCError } from '@trpc/server';
import { users, playerProfiles } from '../../db/schema';

export const profilesRouter = router({
  // Get the current user's profile
  getCurrent: protectedProcedure.query(async ({ ctx }) => {
    const clerkId = ctx.auth.userId;
    
    // Get user from database
    const user = await ctx.db.query.users.findFirst({
      where: eq(users.id, clerkId),
    });
    
    // Get player profile if it exists
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
          console.error("No auth context available");
          return { success: false, action: 'failed', error: 'No auth context' };
        }

        const clerkId = ctx.auth.userId;
        console.log(`Syncing profile for user ${clerkId}`);

        if (!clerkId) {
          console.error("No clerk ID found in auth context");
          return { success: false, action: 'failed', error: 'No user ID' };
        }

        // Extract user info from clerk user object if available
        let firstName = input.firstName || '';
        let lastName = input.lastName || '';
        let email = input.email || '';
        let imageUrl = input.imageUrl || null;

        // If we have ctx.user (from currentUser), use that data to supplement
        if (ctx.user) {
          firstName = firstName || ctx.user.firstName || '';
          lastName = lastName || ctx.user.lastName || '';
          email = email || ctx.user.emailAddresses?.[0]?.emailAddress || `${clerkId}@placeholder.com`;
          imageUrl = imageUrl || ctx.user.imageUrl || null;
        }

        // Check if user already exists
        const existingUser = await ctx.db.query.users.findFirst({
          where: eq(users.id, clerkId),
        });

        if (existingUser) {
          console.log(`Updating existing user ${clerkId}`);

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

          return { success: true, action: 'updated' };
        } else {
          console.log(`Creating new user ${clerkId}`);

          // Create new user
          await ctx.db.insert(users).values({
            id: clerkId,
            firstName,
            lastName,
            email,
            profileImageUrl: imageUrl,
            createdAt: new Date(),
            updatedAt: new Date(),
          });

          return { success: true, action: 'created' };
        }
      } catch (error) {
        console.error('Error syncing profile:', error);
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
        skillLevel: z.string(),
        preferredPlayStyle: z.string().optional(),
        yearsPlaying: z.number().optional(),
        preferredLocation: z.string().optional(),
        bio: z.string().optional(),
        maxTravelDistance: z.number().optional(),
        isAvailableToPlay: z.boolean().optional(),
        strengths: z.array(z.string()).optional(),
        weaknesses: z.array(z.string()).optional(),
        playingFrequency: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      console.log("Profile update received with input:", JSON.stringify(input, null, 2));
      console.log("Auth context:", ctx.auth);
      
      if (!input) {
        console.error("No input received for profile update");
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'No profile data provided',
        });
      }
      
      const clerkId = ctx.auth.userId;
      if (!clerkId) {
        console.error("No userId in auth context");
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User not authenticated',
        });
      }
      
      console.log("Processing update for user ID:", clerkId);
      
      // Check if player profile exists
      const existingProfile = await ctx.db.query.playerProfiles.findFirst({
        where: eq(playerProfiles.userId, clerkId),
      });
      
      // Restore full profile update logic
      if (existingProfile) {
        // Update existing profile
        await ctx.db
          .update(playerProfiles)
          .set({
            skillLevel: input.skillLevel,
            preferredPlayStyle: input.preferredPlayStyle,
            yearsPlaying: input.yearsPlaying,
            preferredLocation: input.preferredLocation,
            bio: input.bio,
            maxTravelDistance: input.maxTravelDistance,
            isAvailableToPlay: input.isAvailableToPlay,
            strengths: input.strengths,
            weaknesses: input.weaknesses,
            playingFrequency: input.playingFrequency,
            updatedAt: new Date(),
          })
          .where(eq(playerProfiles.userId, clerkId));
          
        console.log("Profile updated successfully");
        return { success: true, action: 'updated' };
      } else {
        // Create new profile
        await ctx.db.insert(playerProfiles).values({
          userId: clerkId,
          skillLevel: input.skillLevel,
          preferredPlayStyle: input.preferredPlayStyle,
          yearsPlaying: input.yearsPlaying,
          preferredLocation: input.preferredLocation,
          bio: input.bio,
          maxTravelDistance: input.maxTravelDistance,
          isAvailableToPlay: input.isAvailableToPlay ?? true,
          strengths: input.strengths,
          weaknesses: input.weaknesses,
          playingFrequency: input.playingFrequency,
          updatedAt: new Date(),
        });
        
        console.log("Profile created successfully");
        return { success: true, action: 'created' };
      }
    }),
});
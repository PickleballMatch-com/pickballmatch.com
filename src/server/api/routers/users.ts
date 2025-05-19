import { z } from 'zod';
import { protectedProcedure, router } from '../../trpc';
import { db } from '../../db';
import { users, playerProfiles } from '../../db/schema';
import { eq } from 'drizzle-orm';

export const usersRouter = router({
  // Get current user profile
  getMyProfile: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.auth.userId;

    // Get user data
    const user = await ctx.db.query.users.findFirst({
      where: eq(users.id, userId),
    });
    
    if (!user) {
      throw new Error('User not found');
    }
    
    // Get player profile
    const profile = await ctx.db.query.playerProfiles.findFirst({
      where: eq(playerProfiles.userId, userId),
    });
    
    return { user, profile };
  }),
  
  // Update player profile
  updateProfile: protectedProcedure
    .input(
      z.object({
        skillLevel: z.string().optional(),
        preferredPlayStyle: z.string().optional(),
        yearsPlaying: z.number().int().optional(),
        preferredLocation: z.string().optional(),
        bio: z.string().optional(),
        availability: z.string().optional(), // JSON string
        maxTravelDistance: z.number().int().optional(),
        isAvailableToPlay: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.auth.userId;

      // Check if profile exists
      const existingProfile = await ctx.db.query.playerProfiles.findFirst({
        where: eq(playerProfiles.userId, userId),
      });

      if (existingProfile) {
        // Update existing profile
        return ctx.db
          .update(playerProfiles)
          .set({
            ...input,
            updatedAt: new Date(),
          })
          .where(eq(playerProfiles.userId, userId));
      } else {
        // Create new profile
        return ctx.db.insert(playerProfiles).values({
          userId,
          ...input,
          updatedAt: new Date(),
        });
      }
    }),
  
  // Get available players for matching
  getAvailablePlayers: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.auth.userId;

    // Get profiles of users who are available to play, excluding current user
    const availablePlayers = await ctx.db.query.playerProfiles.findMany({
      where: (profile) => eq(profile.isAvailableToPlay, true) && profile.userId !== userId,
      with: {
        user: true,
      },
    });

    return availablePlayers;
  }),
}); 
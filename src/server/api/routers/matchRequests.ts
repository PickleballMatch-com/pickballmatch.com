import { z } from 'zod';
import { protectedProcedure, router } from '../../trpc';
import { db } from '../../db';
import { matchRequests, matches } from '../../db/schema';
import { eq, and, or } from 'drizzle-orm';

export const matchRequestsRouter = router({
  // Create a new match request
  create: protectedProcedure
    .input(
      z.object({
        recipientId: z.string(),
        proposedTime: z.date(),
        proposedLocation: z.string(),
        message: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.auth.userId;
      const { recipientId, proposedTime, proposedLocation, message } = input;

      // Create new match request
      return ctx.db.insert(matchRequests).values({
        requesterId: userId,
        recipientId,
        proposedTime,
        proposedLocation,
        message,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }),
  
  // Get all match requests for the current user (sent and received)
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.auth.userId;

    // Get both sent and received match requests
    const requests = await ctx.db.query.matchRequests.findMany({
      where: or(
        eq(matchRequests.requesterId, userId),
        eq(matchRequests.recipientId, userId)
      ),
      with: {
        requester: true,
        recipient: true,
      },
      orderBy: (matchRequests, { desc }) => [desc(matchRequests.createdAt)],
    });
    
    return requests;
  }),
  
  // Respond to a match request (accept or decline)
  respond: protectedProcedure
    .input(
      z.object({
        requestId: z.string().uuid(),
        status: z.enum(['accepted', 'declined']),
        scheduledTime: z.date().optional(),
        location: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.auth.userId;
      const { requestId, status, scheduledTime, location } = input;

      // Verify this request is for the current user
      const request = await ctx.db.query.matchRequests.findFirst({
        where: and(
          eq(matchRequests.id, requestId),
          eq(matchRequests.recipientId, userId)
        ),
      });

      if (!request) {
        throw new Error('Match request not found or not addressed to you');
      }

      // Update request status
      await ctx.db.update(matchRequests)
        .set({
          status,
          updatedAt: new Date(),
        })
        .where(eq(matchRequests.id, requestId));

      // If accepted, create a match
      if (status === 'accepted' && scheduledTime && location) {
        await ctx.db.insert(matches).values({
          matchRequestId: requestId,
          status: 'scheduled',
          scheduledTime,
          location,
          playerIds: [request.requesterId, userId],
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
      
      return { success: true };
    }),
}); 
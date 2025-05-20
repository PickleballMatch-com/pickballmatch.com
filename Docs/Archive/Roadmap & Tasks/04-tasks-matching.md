# Matching System Tasks
**Feature Area:** Matching & Swiping Interface  
**Last Updated:** May 10, 2025  
**Status:** Not Started  
**Planned Start:** After User Profiles

---

## 🌟 Git Workflow for This Feature

```
# 1. Create feature branch from develop
git checkout develop
git pull origin develop
git checkout -b feature/matching-system

# 2. Work on tasks, committing regularly
git add .
git commit -m "feat: implement matching algorithm"

# 3. Push branch to remote (first time)
git push -u origin feature/matching-system

# 4. Subsequent pushes
git push

# 5. When feature is complete, create PR to develop
# Use GitHub interface to create PR

# 6. After PR approval and merge to develop, test on staging
# Staging deployment happens automatically with develop branch

# 7. Clean up feature branch after merge
git checkout develop
git pull origin develop
git branch -d feature/matching-system
```

---

## Database Models & API

### Matching Schema
- [ ] Define matching-related models in Prisma
  - [ ] MatchPreference model
  - [ ] PotentialMatch model
  - [ ] ReachOut model
  - [ ] Connection model
- [ ] Create schema relations
  - [ ] User to MatchPreference (one-to-one)
  - [ ] User to ReachOut (one-to-many)
  - [ ] User to Connection (many-to-many)
- [ ] Create migrations for matching tables
- [ ] Add indexes for performance optimization

### Matching Algorithm
- [ ] Design algorithm interface and parameters
- [ ] Implement core matching algorithm
  - [ ] DUPR compatibility scoring
  - [ ] Location proximity calculation
  - [ ] Preference weighting system
  - [ ] Travel date overlap detection
- [ ] Create algorithm unit tests
- [ ] Implement filter system:
  - [ ] Age filter
  - [ ] DUPR range filter
  - [ ] Gender filter
  - [ ] Location radius filter
  - [ ] Match type filter (casual, tournament, etc.)
- [ ] Optimize algorithm for performance

### API Routes
- [ ] Create tRPC router for matching
- [ ] Implement endpoints:
  - [ ] Get potential matches (with pagination)
  - [ ] Apply match filters
  - [ ] Add user to reach-out list
  - [ ] Remove from reach-out list
  - [ ] Get reach-out list
  - [ ] Mark as connected
- [ ] Set up validation schemas
- [ ] Implement proper error handling

---

## UI Components

### Swipe Interface
- [ ] Create card component for potential matches
  - [ ] Photo carousel
  - [ ] Basic profile info display
  - [ ] DUPR rating display
  - [ ] Distance indicator
  - [ ] Match type indicator
  - [ ] Travel badge (if applicable)
- [ ] Implement swipe mechanics
  - [ ] Touch gestures
  - [ ] Button controls
  - [ ] Animation effects
- [ ] Create card stack component
  - [ ] Stacking algorithm
  - [ ] Transition animations
  - [ ] Empty state design

### Filter UI
- [ ] Design filter interface
  - [ ] Filter modal/panel
  - [ ] Range sliders for DUPR/age/distance
  - [ ] Selection controls for other filters
  - [ ] Apply/reset buttons
- [ ] Implement filter persistence
- [ ] Add filter indicator badges
- [ ] Create filter presets functionality

### Reach-Out List
- [ ] Design reach-out list interface
- [ ] Create list item component
- [ ] Implement categorization tabs
- [ ] Add action buttons
  - [ ] Message button
  - [ ] Remove button
  - [ ] View profile button
- [ ] Create empty state design

---

## Integration & Flow

### Matching Flow
- [ ] Design overall matching user flow
- [ ] Implement user preference storage
- [ ] Create algorithm feedback mechanism
- [ ] Add analytics events
- [ ] Implement match result caching

### User Experience Enhancements
- [ ] Add "undo" functionality for accidental swipes
- [ ] Implement loading states and skeletons
- [ ] Create instructional overlays for first-time users
- [ ] Add haptic feedback for swipe actions
- [ ] Implement pull-to-refresh for new matches

### Reach-Out Management
- [ ] Design reach-out workflow
- [ ] Implement batch messaging interface
- [ ] Create reach-out list sorting options
- [ ] Add status indicators for reach-outs
- [ ] Implement reach-out expiration logic

---

## Testing & Refinement

### Unit Tests
- [ ] Test matching algorithm accuracy
- [ ] Test filter functionality
- [ ] Test reach-out list management

### Integration Tests
- [ ] Test complete matching flow
- [ ] Test filter application and results
- [ ] Test reach-out to messaging transition

### Load Testing
- [ ] Test algorithm with large user pool
- [ ] Optimize database queries
- [ ] Implement query caching for performance

---

## Dependencies

- **Requires**: User Profiles, Authentication
- **Required by**: Messaging system

---

## Status Tracking

- **Planned Start**: After profiles completion
- **Target Completion**: 2 weeks after start
- **Current Progress**: 0%

---

## Notes & Decisions

- Swiping interface will follow Tinder-style UX but with pickleball-specific metrics
- Algorithm will prioritize skill level compatibility (DUPR)
- Need to handle cases where user pool is small in certain locations
- Reach-out list is distinct from actual connections (requires mutual interest)
- Will consider implementing "boost" functionality for premium users
[{
	"resource": "/Users/jpmiles/pickleball-match/src/app/profile/edit/page.tsx",
	"owner": "typescript",
	"code": "2322",
	"severity": 8,
	"message": "Type '{ id: string; email: string; firstName: string; lastName: string; profileImageUrl: string | null; age: number | null; gender: string | null; locationCoordinates: string | null; lastActive: string | null; createdAt: string; updatedAt: string; } | undefined' is not assignable to type 'User | null | undefined'.\n  Type '{ id: string; email: string; firstName: string; lastName: string; profileImageUrl: string | null; age: number | null; gender: string | null; locationCoordinates: string | null; lastActive: string | null; createdAt: string; updatedAt: string; }' is not assignable to type 'User'.\n    Types of property 'lastActive' are incompatible.\n      Type 'string | null' is not assignable to type 'Date | null | undefined'.\n        Type 'string' is not assignable to type 'Date'.",
	"source": "ts",
	"startLineNumber": 182,
	"startColumn": 11,
	"endLineNumber": 182,
	"endColumn": 15,
	"relatedInformation": [
		{
			"startLineNumber": 9,
			"startColumn": 3,
			"endLineNumber": 9,
			"endColumn": 7,
			"message": "The expected type comes from property 'user' which is declared here on type 'IntrinsicAttributes & ProfileCompletionIndicatorProps'",
			"resource": "/Users/jpmiles/pickleball-match/src/components/profile/ProfileCompletionIndicator.tsx"
		}
	],
	"modelVersionId": 1
},{
	"resource": "/Users/jpmiles/pickleball-match/src/app/profile/edit/page.tsx",
	"owner": "typescript",
	"code": "2322",
	"severity": 8,
	"message": "Type '{ yearsPlaying: number | null; maxTravelDistance: number | null; skillLevel: string; preferredPlayStyle: string; preferredLocation: string; bio: string; playingFrequency: string; isAvailableToPlay: boolean; ... 13 more ...; primaryPaddleId?: string | ... 1 more ... | undefined; }' is not assignable to type 'PlayerProfile'.\n  Types of property 'id' are incompatible.\n    Type 'string | undefined' is not assignable to type 'string'.\n      Type 'undefined' is not assignable to type 'string'.",
	"source": "ts",
	"startLineNumber": 183,
	"startColumn": 11,
	"endLineNumber": 183,
	"endColumn": 24,
	"relatedInformation": [
		{
			"startLineNumber": 10,
			"startColumn": 3,
			"endLineNumber": 10,
			"endColumn": 16,
			"message": "The expected type comes from property 'playerProfile' which is declared here on type 'IntrinsicAttributes & ProfileCompletionIndicatorProps'",
			"resource": "/Users/jpmiles/pickleball-match/src/components/profile/ProfileCompletionIndicator.tsx"
		}
	],
	"modelVersionId": 1
},{
	"resource": "/Users/jpmiles/pickleball-match/src/app/profile/edit/page.tsx",
	"owner": "typescript",
	"code": "2339",
	"severity": 8,
	"message": "Property 'isLoading' does not exist on type 'UseTRPCMutationResult<{ action: string; success: boolean; }, TRPCClientErrorLike<{ input: { skillLevel: string; preferredPlayStyle?: string | undefined; yearsPlaying?: number | undefined; preferredLocation?: string | undefined; ... 5 more ...; playingFrequency?: string | undefined; }; output: { ...; }; transformer: ...'.\n  Property 'isLoading' does not exist on type 'TRPCHookResult & Override<MutationObserverIdleResult<{ action: string; success: boolean; }, TRPCClientErrorLike<{ input: { skillLevel: string; preferredPlayStyle?: string | undefined; yearsPlaying?: number | undefined; ... 6 more ...; playingFrequency?: string | undefined; }; output: { ...; }; transformer: false; er...'.",
	"source": "ts",
	"startLineNumber": 412,
	"startColumn": 37,
	"endLineNumber": 412,
	"endColumn": 46,
	"modelVersionId": 1
},{
	"resource": "/Users/jpmiles/pickleball-match/src/app/profile/edit/page.tsx",
	"owner": "typescript",
	"code": "2339",
	"severity": 8,
	"message": "Property 'isLoading' does not exist on type 'UseTRPCMutationResult<{ action: string; success: boolean; }, TRPCClientErrorLike<{ input: { skillLevel: string; preferredPlayStyle?: string | undefined; yearsPlaying?: number | undefined; preferredLocation?: string | undefined; ... 5 more ...; playingFrequency?: string | undefined; }; output: { ...; }; transformer: ...'.\n  Property 'isLoading' does not exist on type 'TRPCHookResult & Override<MutationObserverIdleResult<{ action: string; success: boolean; }, TRPCClientErrorLike<{ input: { skillLevel: string; preferredPlayStyle?: string | undefined; yearsPlaying?: number | undefined; ... 6 more ...; playingFrequency?: string | undefined; }; output: { ...; }; transformer: false; er...'.",
	"source": "ts",
	"startLineNumber": 414,
	"startColumn": 28,
	"endLineNumber": 414,
	"endColumn": 37,
	"modelVersionId": 1
}]
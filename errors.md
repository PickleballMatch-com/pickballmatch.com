[{
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
	"message": "Property 'isLoading' does not exist on type 'UseTRPCMutationResult<{ success: boolean; action: string; }, TRPCClientErrorLike<{ input: { skillLevel: string; preferredPlayStyle?: string | undefined; yearsPlaying?: number | undefined; preferredLocation?: string | undefined; ... 5 more ...; playingFrequency?: string | undefined; }; output: { ...; }; transformer: ...'.\n  Property 'isLoading' does not exist on type 'TRPCHookResult & Override<MutationObserverIdleResult<{ success: boolean; action: string; }, TRPCClientErrorLike<{ input: { skillLevel: string; preferredPlayStyle?: string | undefined; yearsPlaying?: number | undefined; ... 6 more ...; playingFrequency?: string | undefined; }; output: { ...; }; transformer: true; err...'.",
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
	"message": "Property 'isLoading' does not exist on type 'UseTRPCMutationResult<{ success: boolean; action: string; }, TRPCClientErrorLike<{ input: { skillLevel: string; preferredPlayStyle?: string | undefined; yearsPlaying?: number | undefined; preferredLocation?: string | undefined; ... 5 more ...; playingFrequency?: string | undefined; }; output: { ...; }; transformer: ...'.\n  Property 'isLoading' does not exist on type 'TRPCHookResult & Override<MutationObserverIdleResult<{ success: boolean; action: string; }, TRPCClientErrorLike<{ input: { skillLevel: string; preferredPlayStyle?: string | undefined; yearsPlaying?: number | undefined; ... 6 more ...; playingFrequency?: string | undefined; }; output: { ...; }; transformer: true; err...'.",
	"source": "ts",
	"startLineNumber": 414,
	"startColumn": 28,
	"endLineNumber": 414,
	"endColumn": 37,
	"modelVersionId": 1
}]
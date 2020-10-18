type Commentable = {
	id: number
	commentable_id: string | null
	commentable_type: string | null
	commented_id: string | null
	commented_type: string | null
	comment: string
	commented: User;
	approved: boolean
	rate: number | null
	created_at: string | number | Date | undefined
	updated_at: string /* Date */ | null
};

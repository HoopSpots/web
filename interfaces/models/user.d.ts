type User = {
	pivot: any;
	id: number
	uuid: string
	name: string
	email: string
	email_verified_at: string /* Date */
	last_seen_at: string /* Date */ | null
	preferred_distance: number
	created_at: string /* Date */ | null
	updated_at: string /* Date */ | null
	hoop_spots?: HoopSpot[]|null
	hoop_sessions?: HoopSession[]|null
	avatar?: string
};

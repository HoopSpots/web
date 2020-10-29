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
	slug: string;
	primary_lat: number
	primary_long: number
	provider: string | null
	provider_id: string | null
	primary_city: string | null
	primary_state: string | null
	notify_follower_activity: boolean
	notify_recommendations: boolean
	notify_hoop_sessions: boolean
	notify_comments: boolean
};

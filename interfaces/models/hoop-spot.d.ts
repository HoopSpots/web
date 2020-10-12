type HoopSpot = {
	id: number
	uuid: string
	name: string
	description: string | null
	hoop_spot_type: string
	street_address: string
	city: string
	state: string
	zip: string
	lat: number
	long: number
	created_at: string /* Date */ | null
	updated_at: string /* Date */ | null
	hoop_sessions?: HoopSession[]|null
	members?: User[]|null
	image?: string;
	distance_away?: number;
	members_count?: number;
	full_address?: string;
};

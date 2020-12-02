type HoopSession = {
	id: number
	uuid: string
	creator_id: number
	hoop_spot_id: number
	start_time: string /* Date */
	end_time: string /* Date */
	created_at: string /* Date */ | null
	updated_at: string /* Date */ | null
	creator?: User|null
	hoop_spot?: HoopSpot|null
	members?: User[]|null
	status?: any
	distance_away?: number
	members_count?: number;
	hoop_spots_count?: number;
	first_five_attending?: User[];
	long: number
	lat: number
};

export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export interface Database {
	// Allows automatically instantiating createClient with the right options
	// instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
	__InternalSupabase: {
		PostgrestVersion: '13.0.4';
	};
	graphql_public: {
		Tables: Record<never, never>;
		Views: Record<never, never>;
		Functions: {
			graphql: {
				Args: {
					extensions?: Json;
					operationName?: string;
					query?: string;
					variables?: Json;
				};
				Returns: Json;
			};
		};
		Enums: Record<never, never>;
		CompositeTypes: Record<never, never>;
	};
	public: {
		Tables: {
			pumping_tests: {
				Row: {
					casing_diameter: number;
					created_at: string;
					drilling_company_name: string;
					footnote: string;
					header_note: string;
					id: string;
					motor_type: string;
					pump_diameter: number;
					pump_installation_depth: number;
					pump_stages: number;
					pump_type: string;
					screen_diameter: number;
					static_water_level: number;
					test_end_date: string;
					test_motor_power: number;
					test_start_date: string;
					test_type: string;
					testing_duration: number;
					updated_at: string;
					user_id: string;
					well_depth: number;
					well_location: string;
					well_number: string;
					well_owner_name: string;
				};
				Insert: {
					casing_diameter: number;
					created_at?: string;
					drilling_company_name: string;
					footnote?: string;
					header_note?: string;
					id?: string;
					motor_type: string;
					pump_diameter: number;
					pump_installation_depth: number;
					pump_stages: number;
					pump_type: string;
					screen_diameter: number;
					static_water_level: number;
					test_end_date: string;
					test_motor_power: number;
					test_start_date: string;
					test_type: string;
					testing_duration: number;
					updated_at?: string;
					user_id?: string;
					well_depth: number;
					well_location: string;
					well_number: string;
					well_owner_name: string;
				};
				Update: {
					casing_diameter?: number;
					created_at?: string;
					drilling_company_name?: string;
					footnote?: string;
					header_note?: string;
					id?: string;
					motor_type?: string;
					pump_diameter?: number;
					pump_installation_depth?: number;
					pump_stages?: number;
					pump_type?: string;
					screen_diameter?: number;
					static_water_level?: number;
					test_end_date?: string;
					test_motor_power?: number;
					test_start_date?: string;
					test_type?: string;
					testing_duration?: number;
					updated_at?: string;
					user_id?: string;
					well_depth?: number;
					well_location?: string;
					well_number?: string;
					well_owner_name?: string;
				};
				Relationships: [];
			};
			step_tests: {
				Row: {
					aquifer_drawdown: number;
					created_at: string;
					drawdown: number;
					efficiency_percent: number;
					final_water_level: number;
					flow_rate_lps: number;
					flow_rate_m3h: number;
					id: string;
					motor_speed: number;
					pumping_test_id: string;
					specific_capacity: number;
					specific_drawdown: number;
					step_duration: number;
					step_number: number;
					total_drawdown: number;
					true_specific_drawdown: number;
					updated_at: string;
					well_drawdown: number;
				};
				Insert: {
					aquifer_drawdown: number;
					created_at?: string;
					drawdown: number;
					efficiency_percent: number;
					final_water_level: number;
					flow_rate_lps: number;
					flow_rate_m3h: number;
					id?: string;
					motor_speed: number;
					pumping_test_id: string;
					specific_capacity: number;
					specific_drawdown: number;
					step_duration: number;
					step_number: number;
					total_drawdown: number;
					true_specific_drawdown: number;
					updated_at?: string;
					well_drawdown: number;
				};
				Update: {
					aquifer_drawdown?: number;
					created_at?: string;
					drawdown?: number;
					efficiency_percent?: number;
					final_water_level?: number;
					flow_rate_lps?: number;
					flow_rate_m3h?: number;
					id?: string;
					motor_speed?: number;
					pumping_test_id?: string;
					specific_capacity?: number;
					specific_drawdown?: number;
					step_duration?: number;
					step_number?: number;
					total_drawdown?: number;
					true_specific_drawdown?: number;
					updated_at?: string;
					well_drawdown?: number;
				};
				Relationships: [
					{
						foreignKeyName: 'step_tests_pumping_test_id_fkey';
						columns: ['pumping_test_id'];
						isOneToOne: false;
						referencedRelation: 'pumping_tests';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'step_tests_pumping_test_id_fkey';
						columns: ['pumping_test_id'];
						isOneToOne: false;
						referencedRelation: 'v_pumping_test_steps';
						referencedColumns: ['pumping_test_id'];
					},
				];
			};
			test_analyses: {
				Row: {
					aquifer_loss_coefficient: number;
					created_at: string;
					dynamic_minus_static: number;
					dynamic_water_level: number;
					id: string;
					maximum_permissible_discharge: number;
					pumping_test_id: string;
					updated_at: string;
					wdf: number;
					well_loss_coefficient: number;
				};
				Insert: {
					aquifer_loss_coefficient: number;
					created_at?: string;
					dynamic_minus_static: number;
					dynamic_water_level: number;
					id?: string;
					maximum_permissible_discharge: number;
					pumping_test_id: string;
					updated_at?: string;
					wdf: number;
					well_loss_coefficient: number;
				};
				Update: {
					aquifer_loss_coefficient?: number;
					created_at?: string;
					dynamic_minus_static?: number;
					dynamic_water_level?: number;
					id?: string;
					maximum_permissible_discharge?: number;
					pumping_test_id?: string;
					updated_at?: string;
					wdf?: number;
					well_loss_coefficient?: number;
				};
				Relationships: [
					{
						foreignKeyName: 'test_analyses_pumping_test_id_fkey';
						columns: ['pumping_test_id'];
						isOneToOne: true;
						referencedRelation: 'pumping_tests';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'test_analyses_pumping_test_id_fkey';
						columns: ['pumping_test_id'];
						isOneToOne: true;
						referencedRelation: 'v_pumping_test_steps';
						referencedColumns: ['pumping_test_id'];
					},
				];
			};
		};
		Views: {
			v_pumping_test_steps: {
				Row: {
					aquifer_drawdown: number | null;
					drawdown: number | null;
					efficiency_percent: number | null;
					final_water_level: number | null;
					flow_rate_lps: number | null;
					flow_rate_m3h: number | null;
					motor_speed: number | null;
					pumping_test_id: string | null;
					specific_capacity: number | null;
					specific_drawdown: number | null;
					step_duration: number | null;
					step_number: number | null;
					total_drawdown: number | null;
					true_specific_drawdown: number | null;
					user_id: string | null;
					well_drawdown: number | null;
					well_number: string | null;
				};
				Relationships: [];
			};
		};
		Functions: {
			create_pumping_test: {
				Args: {
					casing_diameter: number;
					drilling_company_name: string;
					footnote?: string;
					header_note?: string;
					motor_type: string;
					pump_diameter: number;
					pump_installation_depth: number;
					pump_stages: number;
					pump_type: string;
					screen_diameter: number;
					static_water_level: number;
					test_end_date: string;
					test_motor_power: number;
					test_start_date: string;
					test_type: string;
					testing_duration: number;
					well_depth: number;
					well_location: string;
					well_number: string;
					well_owner_name: string;
				};
				Returns: string;
			};
		};
		Enums: Record<never, never>;
		CompositeTypes: Record<never, never>;
	};
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<
	keyof Database,
	'public'
>];

export type Tables<
	DefaultSchemaTableNameOrOptions extends
		| keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
		| { schema: keyof DatabaseWithoutInternals },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
				DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
		: never = never,
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
			DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
			Row: infer R;
		}
		? R
		: never
	: DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
				DefaultSchema['Views'])
		? (DefaultSchema['Tables'] &
				DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
				Row: infer R;
			}
			? R
			: never
		: never;

export type TablesInsert<
	DefaultSchemaTableNameOrOptions extends
		| keyof DefaultSchema['Tables']
		| { schema: keyof DatabaseWithoutInternals },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
		: never = never,
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Insert: infer I;
		}
		? I
		: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
		? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
				Insert: infer I;
			}
			? I
			: never
		: never;

export type TablesUpdate<
	DefaultSchemaTableNameOrOptions extends
		| keyof DefaultSchema['Tables']
		| { schema: keyof DatabaseWithoutInternals },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
		: never = never,
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Update: infer U;
		}
		? U
		: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
		? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
				Update: infer U;
			}
			? U
			: never
		: never;

export type Enums<
	DefaultSchemaEnumNameOrOptions extends
		| keyof DefaultSchema['Enums']
		| { schema: keyof DatabaseWithoutInternals },
	EnumName extends DefaultSchemaEnumNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
		: never = never,
> = DefaultSchemaEnumNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
	: DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
		? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
		: never;

export type CompositeTypes<
	PublicCompositeTypeNameOrOptions extends
		| keyof DefaultSchema['CompositeTypes']
		| { schema: keyof DatabaseWithoutInternals },
	CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
		: never = never,
> = PublicCompositeTypeNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
	: PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
		? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
		: never;

export const Constants = {
	graphql_public: {
		Enums: {},
	},
	public: {
		Enums: {},
	},
} as const;

export type PumpingTestsRow =
	Database['public']['Tables']['pumping_tests']['Row'];
export type PumpingTestsInsert =
	Database['public']['Tables']['pumping_tests']['Insert'];
export type StepTestsInsert =
	Database['public']['Tables']['step_tests']['Insert'];
export type TestAnalysesInsert =
	Database['public']['Tables']['test_analyses']['Insert'];

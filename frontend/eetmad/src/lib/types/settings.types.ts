export type SettingDataType = 'string' | 'number' | 'boolean' | 'json' | 'date';

export interface SystemSetting {
  id: string;
  settingKey: string;
  settingValue: string;
  dataType: SettingDataType;
  category: string;
  description: string | null;
  isPublic: boolean;
  isEditable: boolean;
  updatedBy: string | null;
  createdAt: string;
  updatedAt: string;
}

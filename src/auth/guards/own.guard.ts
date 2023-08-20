import { SetMetadata } from '@nestjs/common';

export const IS_OWNER_KEY = 'isPublic';
export const OWNER_GUARD = () => SetMetadata(IS_OWNER_KEY, true);

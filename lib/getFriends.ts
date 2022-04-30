import * as fs from 'fs';

import { FriendsFilePath } from './constants';

export interface FriendLink {
  link: string;
  name: string;
  description?: string;
  avatar?: string;
}

export const getFriends = (): FriendLink[] =>
  JSON.parse(fs.readFileSync(FriendsFilePath, 'utf-8')) as FriendLink[];

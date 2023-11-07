import { InquiryModel } from '../models/InquiryModel';
import { UserModel } from '../models/UserModel';

export type InquiryType = Omit<InstanceType<typeof InquiryModel>, ''>;

export type UserType = Omit<InstanceType<typeof UserModel>, ''>;

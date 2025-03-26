import TeamMember, { ITeamMember } from "../models/TeamMember";

export const getAllTeamMembers = async (): Promise<ITeamMember[]> => {
  return await TeamMember.find();
};

export const getTeamMemberById = async (id: string): Promise<ITeamMember | null> => {
  return await TeamMember.findById(id);
};

export const createTeamMember = async (data: ITeamMember): Promise<ITeamMember> => {
  const newMember = new TeamMember(data);
  return await newMember.save();
};

export const updateTeamMember = async (id: string, data: Partial<ITeamMember>): Promise<ITeamMember | null> => {
  return await TeamMember.findByIdAndUpdate(id, data, { new: true });
};

export const deleteTeamMember = async (id: string): Promise<ITeamMember | null> => {
  return await TeamMember.findByIdAndDelete(id);
};

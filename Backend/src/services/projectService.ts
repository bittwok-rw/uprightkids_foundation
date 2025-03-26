import Project, { IProject } from "../models/Project";

export const getProjects = async () => {
  return await Project.find();
};

export const getProjectBySlug = async (slug: string) => {
  return await Project.findOne({ slug });
};

export const createProject = async (data: IProject) => {
  const newProject = new Project(data);
  return await newProject.save();
};

export const updateProject = async (slug: string, data: Partial<IProject>) => {
  return await Project.findOneAndUpdate({ slug }, data, { new: true });
};

export const deleteProject = async (slug: string) => {
  return await Project.findOneAndDelete({ slug });
};

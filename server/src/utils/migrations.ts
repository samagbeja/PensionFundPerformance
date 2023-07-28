import Profile from "../schema/profile.schema";

const migrate = async () => {
  await Profile.sync({ alter: true });
};

export default migrate;

import AuditTrail from "../schema/auditTrail.schema";
// import Profile from "../schema/profile.schema";
import CaseStudies from "../schema/caseStudies.schema";
import CommunicationChannels from "../schema/communicationChannels.schema";
import Feedback from "../schema/feedback.schema";
import FocusGroupFeedback from "../schema/FocusGroupFeedback.schema";
import FocusGroupSessions from "../schema/FocusGroupSessions.schema";
import Investments from "../schema/investments.schema";
import marketUpdates from "../schema/marketUpdates.schema";
import Messages from "../schema/messages.schema";
import PensionFunds from "../schema/pensionFunds.schema";
import PerformanceMetrics from "../schema/performanceMetrics";
import ReportAccess from "../schema/reportAccess.schema";
import Reports from "../schema/reports.schema";
import ResearchSurveys from "../schema/researchSurveys.schema";
import RiskMetrics from "../schema/riskMetrics.schema";
import Stakeholders from "../schema/stakeholders.schema";
import SurveyQuestions from "../schema/SurveyQuestions.schema";
import SurveyResponses from "../schema/SurveyResponses.schema";
import userPreferences from "../schema/userPreferences.schema";
import Users from "../schema/users.schema";
import WebApplications from "../schema/webApplications.schema";

const migrate = async () => {
  // await Profile.sync({ alter: true });
  await Users.sync({ alter: true });
  await AuditTrail.sync({ alter: true });
  await CaseStudies.sync({ alter: true });
  await CommunicationChannels.sync({ alter: true });
  await Feedback.sync({ alter: true });
  await FocusGroupSessions.sync({ alter: true });
  
  await marketUpdates.sync({ alter: true });
  
  await PensionFunds.sync({ alter: true });
  await Investments.sync({ alter: true });
  await PerformanceMetrics.sync({ alter: true });
  
  await Reports.sync({ alter: true });
  await ReportAccess.sync({ alter: true });
  await ResearchSurveys.sync({ alter: true });
  await RiskMetrics.sync({ alter: true });
  await Stakeholders.sync({ alter: true });
  await Messages.sync({ alter: true });
  await SurveyQuestions.sync({ alter: true });
  await SurveyResponses.sync({ alter: true });
  await userPreferences.sync({ alter: true });
  
  await WebApplications.sync({ alter: true });
  await FocusGroupFeedback.sync({ alter: true });

};

export default migrate;

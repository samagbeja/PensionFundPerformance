import { presentMessage } from "../utils/validate";
import { Response } from "express";

import Users from "../schema/users.schema";

import Feedback, { FeedbackInput } from "../schema/feedback.schema";

export class FeedbackService {
  async fetchAll(res: Response) {
    try {
      let records: any = await Feedback.findAll();
      let arrRecord = [];
      for (let record of records) {
        let findRecord: any = await Users.findOne({
          where: { userId: record.userId },
        });

        record = record.get();
        arrRecord.push({
          ...record,

          username: findRecord.username,
        });
      }
      return presentMessage(res, 200, arrRecord, "Record Fetched");
    } catch (err) {
      return presentMessage(res, 500, null, "Unexpected Server Error" + err);
    }
  }

  async add(res: Response, input: FeedbackInput) {
    try {
      const { feedbackText, feedbackDate, userId } = input;

      let newRecord: any = await Feedback.create({
        feedbackText,
        feedbackDate,
        userId,
      });
      newRecord = newRecord.get();

      return presentMessage(res, 201, newRecord, "Record Created");
    } catch (err) {
      return presentMessage(res, 500, null, "Unexpected Server Error" + err);
    }
  }

  async update(res: Response, input: FeedbackInput) {
    try {
      const { feedbackText, feedbackDate, userId, feedbackId } = input;

      await Feedback.update(
        {
          feedbackText,
          feedbackDate,
          userId,
        },
        {
          where: {
            feedbackId,
          },
        }
      );

      return presentMessage(res, 200, null, "Record successfully updated");
    } catch (err) {
      return presentMessage(res, 500, null, "Unexpected Server Error" + err);
    }
  }

  async delete(res: Response, id: string | number) {
    try {
      await Feedback.destroy({
        where: {
          feedbackId: id,
        },
      });

      return presentMessage(res, 200, null, "Record successfully deleted");
    } catch (err) {
      return presentMessage(res, 500, null, "Unexpected Server Error" + err);
    }
  }
}

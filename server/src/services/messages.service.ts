import { presentMessage } from "../utils/validate";
import { Response } from "express";

import Stakeholders from "../schema/stakeholders.schema";

import Messages, { MessagesInput } from "../schema/messages.schema";

export class MessagesService {
  async fetchAll(res: Response) {
    try {
      let records: any = await Messages.findAll();
      let arrRecord = [];
      for (let record of records) {
        let findRecord: any = await Stakeholders.findOne({
          where: { stakeholderId: record.senderId },
        });
        let findRecord2: any = await Stakeholders.findOne({
          where: { stakeholderId: record.recieverId },
        });
        record = record.get();
        arrRecord.push({
          ...record,
          senderName: findRecord.stakeholderName,
          recieverName: findRecord2.stakeholderName,
        });
      }
      return presentMessage(res, 200, arrRecord, "Record Fetched");
    } catch (err) {
      return presentMessage(res, 500, null, "Unexpected Server Error" + err);
    }
  }

  async add(res: Response, input: MessagesInput) {
    try {
      const { senderId, recieverId, subject, content, sentDate } = input;

      let newRecord: any = await Messages.create({
        senderId,
        recieverId,
        subject,
        content,
        sentDate,
      });
      newRecord = newRecord.get();

      return presentMessage(res, 201, newRecord, "Record Created");
    } catch (err) {
      return presentMessage(res, 500, null, "Unexpected Server Error" + err);
    }
  }

  async update(res: Response, input: MessagesInput) {
    try {
      const { messageId, senderId, recieverId, subject, content, sentDate } =
        input;

      await Messages.update(
        {
          senderId,
          recieverId,
          subject,
          content,
          sentDate,
        },
        {
          where: {
            messageId,
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
      await Messages.destroy({
        where: {
          riskId: id,
        },
      });

      return presentMessage(res, 200, null, "Record successfully deleted");
    } catch (err) {
      return presentMessage(res, 500, null, "Unexpected Server Error" + err);
    }
  }
}

import env from "../env";
import { Logger } from "./logger";

/**
 * A utility to safely get the hidden Data Commons from the environment variable.
 * If it is not set, return an empty array.
 *
 * @returns An array of hidden Data Commons or an empty array if not set.
 */
export const getFilteredDataCommons = (): string[] => {
  const { REACT_APP_HIDDEN_MODELS } = env || {};

  if (!REACT_APP_HIDDEN_MODELS || typeof REACT_APP_HIDDEN_MODELS !== "string") {
    Logger.error("getFilteredDataCommons: REACT_APP_HIDDEN_MODELS is not set or is not a string");
    return [];
  }

  const mapped = REACT_APP_HIDDEN_MODELS.split(",")
    .map((dc) => dc?.trim())
    .filter((dc) => dc?.length);

  if (!mapped?.length) {
    return [];
  }

  return mapped;
};

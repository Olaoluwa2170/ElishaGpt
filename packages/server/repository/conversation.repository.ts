let conversationMap = new Map<string, string>();

export const conversationResp = {
  getConversationId: (conversationId: string): string | undefined => {
    return conversationMap.get(conversationId);
  },

  setConversationId: (conversationId: string, responseId: string) => {
    conversationMap.set(conversationId, responseId);
  },
};

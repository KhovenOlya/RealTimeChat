// chatReducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Message {
  sender: string;
  payload: string;
  error: boolean;
}

interface ChatState {
  messages: Message[];
}

const initialState: ChatState = {
  messages: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    sendMessage(state, action: PayloadAction<Message>) {
      state.messages.push(action.payload);
    },
    receiveMessage(state, action: PayloadAction<Message>) {
      state.messages.push(action.payload);
    },
  },
});

export const { sendMessage, receiveMessage } = chatSlice.actions;
export default chatSlice.reducer;

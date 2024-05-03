import { createSlice } from '@reduxjs/toolkit';

const quizzesSlice = createSlice({
    name: 'quizzes',
    initialState: {quizzes: {}},
    reducers: {
        addQuiz: (state, action) => {
            const {name, id, topicId, cardIds} = action.payload;

            state.quizzes[id] = {
                name: name,
                id: id,
                topicId: topicId,
                cardIds: cardIds
            }
        }
    }
});


export const selectQuizzes = (state) => state.quizzes.quizzes;
export const { addQuiz } = quizzesSlice.actions;
export default quizzesSlice.reducer;
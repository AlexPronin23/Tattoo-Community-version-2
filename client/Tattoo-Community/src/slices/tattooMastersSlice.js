import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Получение всех тату мастеров
export const getAllTattooMasters = createAsyncThunk(
    'tattooMasters/getAllTattooMasters',
    async function (_, { rejectWithValue }) {
        try {
            const response = await fetch('/api/tattoomasters');

          
            const data = await response.json();

              if (!response.ok) {
                 return rejectWithValue({message:data.message})
            }

            return data.masters;

        } catch (error) {
            return rejectWithValue({ message: error.message });
        }
    }
);

// Создание анкеты
export const createWorkSheet = createAsyncThunk(
    'tattooMasters/createWorkSheet',
    async function ({ masterInfo }, { rejectWithValue }) {
        try {
            const response = await fetch('/api/tattoomasters/profile', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(masterInfo)
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue({ message: data.message });
            }

            return {
                message: data.message,
                master: data.master
            };

        } catch (error) {
            return rejectWithValue({ message: error.message });
        }
    }
);

// Проверка создания анкеты
export const checkWorkSheet = createAsyncThunk(
    'tattooMasters/checkWorkSheet',
    async function (_, { rejectWithValue }) {
        try {
            const response = await fetch('/api/tattoomasters/check', {
                credentials: 'include'
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue({ message: data.message });
            }

            return data.master;

        } catch (error) {
            return rejectWithValue({ message: error.message });
        }
    }
);

// Обновление анкеты
export const updateWorkSheet = createAsyncThunk(
    'tattooMasters/updateWorkSheet',
    async function ({ id, newMasterInfo }, { rejectWithValue }) {
        try {
            const response = await fetch(`/api/tattoomasters/edit/${id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newMasterInfo)
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue({ message: data.message });
            }

            return {
                message: data.message,
                master: data.master
            };

        } catch (error) {
            return rejectWithValue({ message: error.message });
        }
    }
);

// Получение информации об одном мастере
export const getOneMaster = createAsyncThunk(
    'tattooMasters/getOneMaster',
    async function ({ id }, { rejectWithValue }) {
        try {
            const response = await fetch(`/api/tattoomasters/${id}`, {
                credentials: 'include'
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue({ message: data.message });
            }

            return {
                message: data.message,
                master: data.master
            };

        } catch (error) {
            return rejectWithValue({ message: error.message });
        }
    }
);

export const tattooMastersSlice = createSlice({
    name: 'tattooMasters',
    initialState: {
        tattooMasters: [],
        status: null,
        error: null,
        created: false,
        currentMaster: null,
        masterPage: null,
        message: ''
    },
    reducers: {
        resetMasterState: (state) => {
            state.currentMaster = null;
            state.masterPage = null;
            state.created = false;
            state.error = null;
            state.status = null;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            // === getAllTattooMasters ===
            .addCase(getAllTattooMasters.pending, (state) => {
                state.status = 'Загрузка';
                state.error = null;
            })
            .addCase(getAllTattooMasters.fulfilled, (state, action) => {
                state.status = 'Успешно';
                state.tattooMasters = action.payload;
            })
            .addCase(getAllTattooMasters.rejected, (state, action) => {
                state.status = 'Отклонен';
                state.error = action.payload.message;   // ← единообразно
            })

            // === createWorkSheet ===
            .addCase(createWorkSheet.pending, (state) => {
                state.status = 'Загрузка';
                state.error = null;
            })
            .addCase(createWorkSheet.fulfilled, (state, action) => {
                state.status = 'Успешно';
                state.currentMaster = action.payload.master;
                state.created = true;
                state.message = action.payload.message;
            })
            .addCase(createWorkSheet.rejected, (state, action) => {
                state.status = 'Отклонен';
                state.currentMaster = null;
                state.error = action.payload.message;
                state.created = false;
                state.message = action.payload.message;
            })

            // === checkWorkSheet ===
            .addCase(checkWorkSheet.pending, (state) => {
                state.status = 'Загрузка';
                state.error = null;
            })
            .addCase(checkWorkSheet.fulfilled, (state, action) => {
                state.status = 'Успешно';
                state.currentMaster = action.payload;
                state.created = true;
            })
            .addCase(checkWorkSheet.rejected, (state, action) => {
                state.status = 'Отклонен';
                state.currentMaster = null;
                state.error = action.payload.message;
                state.created = false;
            })

            // === getOneMaster ===
            .addCase(getOneMaster.pending, (state) => {
                state.status = 'Загрузка';
                state.error = null;
            })
            .addCase(getOneMaster.fulfilled, (state, action) => {
                state.status = 'Успешно';
                state.masterPage = action.payload.master;
                state.message = action.payload.message;
            })
            .addCase(getOneMaster.rejected, (state, action) => {
                state.status = 'Отклонен';
                state.error = action.payload.message;
            })

            // === updateWorkSheet ===
            .addCase(updateWorkSheet.pending, (state) => {
                state.status = 'Загрузка';
                state.error = null;
            })
            .addCase(updateWorkSheet.fulfilled, (state, action) => {
                state.status = 'Успешно';
                state.currentMaster = action.payload.master;   
                state.masterPage = action.payload.master;
                state.message = action.payload.message;
            })
            .addCase(updateWorkSheet.rejected, (state, action) => {
                state.status = 'Отклонен';
                state.error = action.payload.message;
                state.message = action.payload.message;
            });
    }
});

export default tattooMastersSlice.reducer;
export const { resetMasterState } = tattooMastersSlice.actions;
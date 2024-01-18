import { configureStore } from '@reduxjs/toolkit'
import authSlice from './features/auth/authSlice'
import userSlice from './features/user/userSlice'
import projectSlice from './features/project/projectSlice'
import resourceSlice from './features/resource/resourceSlice'
import endpointSlice from './features/endpoint/endpointSlice'
import dataSlice from './features/data/dataSlice'
import policySlice from './features/policy/policySlice'
import edgeSlice from './features/edge/edgeSlice'
import cacheSlice from './features/cache/cacheSlice'
import eventSlice from './features/event/eventSlice'

const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    project: projectSlice,
    resource: resourceSlice,
    endpoint: endpointSlice,
    data: dataSlice,
    policy: policySlice,
    edge: edgeSlice,
    cache: cacheSlice,
    event: eventSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;
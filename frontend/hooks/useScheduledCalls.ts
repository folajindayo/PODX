// hooks/useScheduledCalls.ts
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
    useScheduleCallMutation,
    useGetUserScheduledCallsQuery,
    scheduledCallsApiSlice
} from '@/store/api/scheduledCallsApi';
import {
    setScheduledSessions,
    clearScheduledSessions
} from '@/store/slices/scheduledSessionSlice';
import type { StreamCallData } from '@/components/pod/streamCallData';
import type { ApiResponse } from '@/store/api/api';
import type { ScheduleCallArgs, GetScheduledCallResponse } from '@/store/api/scheduledCallsApi';

interface UseScheduledCallsReturn {
    scheduledSessions: StreamCallData[];
    scheduleCall: (args: ScheduleCallArgs) => Promise<{ data: ApiResponse<StreamCallData> }>;
    isLoading: boolean;
    getScheduledCall: (sessionId: string) => Promise<ApiResponse<GetScheduledCallResponse | null>>;
}

export const useScheduledCalls = (): UseScheduledCallsReturn => {
    const dispatch = useAppDispatch();
    const scheduledSessions = useAppSelector((state) => state.scheduledSessions.sessions);

    // RTK Query hooks
    const [scheduleCallMutation, { isLoading: isScheduling }] = useScheduleCallMutation();
    const { data: userScheduledCalls, isLoading: isLoadingCalls } = useGetUserScheduledCallsQuery();

    // Update local state when user scheduled calls change
    useEffect(() => {
        if (userScheduledCalls?.data?.calls) {
            dispatch(setScheduledSessions(userScheduledCalls.data.calls));
        }
    }, [userScheduledCalls, dispatch]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            dispatch(clearScheduledSessions());
        };
    }, [dispatch]);

    // Get a single scheduled call using RTK Query
    const getScheduledCall = async (sessionId: string): Promise<ApiResponse<GetScheduledCallResponse | null>> => {
        try {
            const result = await dispatch(
                scheduledCallsApiSlice.endpoints.getScheduledCall.initiate(sessionId)
            );

            if ('error' in result) {
                return {
                  status: false,  // changed from 'success' to 'status'
                  message: 'Failed to fetch scheduled call',
                  data: null
                };
              }
            
            if (!result.data) {
                return {
                    status: false,
                    message: 'No scheduled call found',
                    data: null
                };
            }

            return result.data as ApiResponse<GetScheduledCallResponse | null>;
        } catch (error) {
            console.error('Failed to get scheduled call:', error);
            return {
                status: false,
                message: error instanceof Error ? error.message : 'An unexpected error occurred',
                data: null
            };
        }
    };

    return {
        scheduledSessions,
        scheduleCall: async (args: ScheduleCallArgs) => {
            try {
                const result = await scheduleCallMutation(args);
                if ('error' in result) {
                    return {
                        data: {
                            status: false,
                            message: 'Failed to schedule call',
                            data: {} as StreamCallData 
                        }
                    };
                }
                return { data: result.data as ApiResponse<StreamCallData> };
            } catch (error) {
                return {
                    data: {
                        status: false,
                        message: error instanceof Error ? error.message : 'Failed to schedule call',
                        data: {} as StreamCallData
                    }
                };
            }
        },
        isLoading: isLoadingCalls || isScheduling,
        getScheduledCall,
    };
};
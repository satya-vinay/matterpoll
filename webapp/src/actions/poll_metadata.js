import {id as pluginId} from 'manifest';
import ActionTypes from 'action_types';

export const websocketHasVoted = (data) => async (dispatch) => {
    return dispatch({
        type: ActionTypes.FETCH_POLL_METADATA,
        data: {
            voted_answers: data.voted_answers,
            user_id: data.user_id,
            poll_id: data.poll_id,
            can_manage_poll: data.can_manage_poll,
            setting_progress: data.setting_progress,
            setting_public_add_option: data.setting_public_add_option,
        },
    });
};

export const fetchPollMetadata = (siteUrl, pollId) => async (dispatch) => {
    if (!pollId) {
        return;
    }

    let url = siteUrl.replace(/\/?$/, '');
    url = `${url}/plugins/${pluginId}/api/v1/polls/${pollId}/metadata`;

    try {
        const resp = await fetch(url);
        dispatch({
            type: ActionTypes.FETCH_POLL_METADATA,
            data: await resp.json(),
        });
    } catch (err) {
        //eslint-disable-next-line no-console
        console.log('failed to fetch metadata: ', err);
    }
};

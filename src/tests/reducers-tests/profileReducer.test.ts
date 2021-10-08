import {
    profileActions,
    profileInitialState,
    profileReducer, requestStatus,
    setProfileData, updateProfileInfo, updateProfilePhoto, updateStatus
} from "../../store/slice-reducers/profileReducer";
import {getActions, mockResponses, mockStore, spyAllAPIMethodsAndClearActions} from "./index";
import {store} from "../../store/store";

const firstProfile = {
    userId: 1,
    aboutMe: 'sagas',
    fullName: 'isfj',
    lookingForAJob: true,
    lookingForAJobDescription: 'iuhbjnk',
    photos: {large: 'iujnm', small: 'siueio'},
    contacts: {
        facebook: 'iuhj',
        github: 'erty',
        instagram: 'ygb',
        mainLink: 'asfsag',
        twitter: null,
        vk: 'yuiop[',
        website: 'asvasc',
        youtube: 'uwjqkm'
    }
}
const secondProfile = {
    userId: 3,
    aboutMe: 'kik',
    fullName: 'asd',
    lookingForAJob: false,
    lookingForAJobDescription: 'uytyuiop',
    photos: {large: 'iujnasvascm', small: 'asdasd'},
    contacts: {
        facebook: 'okjmkl',
        github: 'qweqw',
        instagram: 'ygaab',
        mainLink: 'sss',
        twitter: 'safva',
        vk: 'pop',
        website: 'fchs',
        youtube: null
    }
}

describe('sync actions', () => {

    let state = profileInitialState


    beforeEach(() => {
        state = profileInitialState
    })

    test('setUserProfile', () => {

        state = profileReducer(state, profileActions.setUserProfile({profile: firstProfile}))
        expect(state.profile).toEqual(firstProfile)

        state = profileReducer(state, profileActions.setUserProfile({profile: secondProfile}))
        expect(state.profile).toEqual(secondProfile)
    })

    test('setFetch', () => {
        state = profileReducer(state, profileActions.setFetch({isFetching: true}))
        expect(state.isFetching).toBeTruthy()
        state = profileReducer(state, profileActions.setFetch({isFetching: false}))
        expect(state.isFetching).toBeFalsy()
    })

    test('setStatus', () => {
        let payload = {status: 'asga'}
        state = profileReducer(state, profileActions.setStatus(payload))
        expect(state.status).toBe(payload.status)
        payload = {status: 'iuytyuio'}
        state = profileReducer(state, profileActions.setStatus(payload))
        expect(state.status).toBe(payload.status)
    })

    test('updateProfilePhoto', () => {
        let payload = {image: 'jhgbnmk'}
        state = profileReducer(state, profileActions.updateProfilePhoto(payload))
        expect(state.profile.photos.large).toBe(payload.image)
        payload = {image: 'uiyutyf'}
        state = profileReducer(state, profileActions.updateProfilePhoto(payload))
        expect(state.profile.photos.large).toBe(payload.image)
    })

    test('updateProfileInfo', () => {
        state = profileReducer(state, profileActions.updateProfileInfo({profileInfo: firstProfile}))
        expect(state.profile).toEqual(firstProfile)
        state = profileReducer(state, profileActions.updateProfileInfo({profileInfo: secondProfile}))
        expect(state.profile).toEqual(secondProfile)
    })

    it('editErrorMessage', () => {
        let payload = {errorMessages: ['sadsad']}
        state = profileReducer(state, profileActions.editErrorMessage(payload))
        expect(state.errorMessages).toEqual(payload.errorMessages)
        payload = {errorMessages: ['uyghj']}
        state = profileReducer(state, profileActions.editErrorMessage(payload))
        expect(state.errorMessages).toEqual(payload.errorMessages)
    })
})

describe('async actions', () => {
    beforeEach(() => {
        spyAllAPIMethodsAndClearActions()
    })

    test('setProfileData', async () => {
        await mockStore.dispatch(setProfileData(1))

        const actions = getActions()
        expect(actions[0].type).toBe(setProfileData.pending.type)
        expect(actions[1]).toEqual(profileActions.setFetch({isFetching: true}))
        expect(actions[2]).toEqual(profileActions.setUserProfile({profile: mockResponses.getProfileData}))
        expect(actions[3]).toEqual(profileActions.setFetch({isFetching: false}))
        expect(actions[4].type).toBe(setProfileData.fulfilled.type)
    })



    test('updateProfilePhoto', async () => {
        let f = new File([""], "filename", { type: 'text/html' })
        await mockStore.dispatch(updateProfilePhoto(f))

        const actions = getActions()
        expect(actions[0].type).toBe(updateProfilePhoto.pending.type)
        expect(actions[1]).toEqual(profileActions.updateProfilePhoto({image: mockResponses.updateProfilePhoto.data.photos.large as string}))
        expect(actions[2].type).toBe(updateProfilePhoto.fulfilled.type)
    })

    test('requestStatus', async () => {
        await mockStore.dispatch(requestStatus(897))

        const actions = getActions()
        expect(actions[0].type).toBe(requestStatus.pending.type)
        expect(actions[1]).toEqual(profileActions.setStatus({status: mockResponses.getStatus}))
        expect(actions[2].type).toBe(requestStatus.fulfilled.type)
    })

    test('updateStatus', async () => {
        await mockStore.dispatch(updateStatus('oiuytg'))

        const actions = getActions()
        expect(actions[0].type).toBe(updateStatus.pending.type)
        expect(actions[1]).toEqual(profileActions.setStatus({status: 'oiuytg'}))
        expect(actions[2].type).toBe(updateStatus.fulfilled.type)
    })

    test('updateProfileInfo', async () => {
        await mockStore.dispatch(updateProfileInfo(firstProfile))

        const actions = getActions()
        expect(actions[0].type).toBe(updateProfileInfo.pending.type)
        expect(actions[1]).toEqual(profileActions.updateProfileInfo({profileInfo: firstProfile}))
        expect(actions[2]).toEqual(profileActions.editErrorMessage({errorMessages: null}))
        expect(actions[3].type).toBe(updateProfileInfo.fulfilled.type)
    })
})
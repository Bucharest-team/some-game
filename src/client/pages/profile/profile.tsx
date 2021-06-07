import React from 'react';
import { useDispatch } from 'react-redux';
import { CircularProgress, Container, Divider, Typography } from '@material-ui/core';

import { logout } from '@slices/user';
import { Meta } from '@components/meta';
import { BASE_RESOURCE_URL } from '../../constants';
import { withPrivateRoute } from '../../hoc/with-private-route';

import { useProfile } from './use-profile';
import {
    Wrapper,
    Thumbnail,
    List,
    ListItemText,
    Link,
    Button,
    Buttons,
    NoAvatar,
    AvatarWrapper
} from './profile.style';

const ProfileInner = () => {
    const dispatch = useDispatch();
    const { isLoading, avatar, first_name, display_name, second_name, phone, email } = useProfile();

    const handleLogout = React.useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    if (isLoading) {
        return (
            <Wrapper>
                <CircularProgress size={64} />
            </Wrapper>
        );
    }

    return (
        <Container maxWidth="sm">
            <Meta title="Профиль" description="Страница профиля" />
            <Wrapper>
                <AvatarWrapper>
                    {avatar ? (
                        <Thumbnail src={`${BASE_RESOURCE_URL}${avatar}`} />
                    ) : (
                        <NoAvatar color="primary" fontSize="large" />
                    )}
                </AvatarWrapper>
                <div>
                    <Typography variant="h4" color="inherit" display="block">
                        {first_name}
                    </Typography>
                    <Typography variant="h4" color="inherit" display="block">
                        {second_name}
                    </Typography>
                </div>
            </Wrapper>
            <List>
                <Divider />
                <ListItemText>
                    <span>Никнейм:</span>
                    <span>{display_name}</span>
                </ListItemText>
                <Divider />
                <ListItemText>
                    <span>Почта:</span>
                    <span>{email}</span>
                </ListItemText>
                <Divider />
                <ListItemText>
                    <span>Телефон:</span>
                    <span>{phone}</span>
                </ListItemText>
                <Divider />
            </List>
            <Buttons>
                <Link to="/profile-edit">Редактировать</Link>
                <Button onClick={handleLogout} color="secondary">
                    Выход
                </Button>
            </Buttons>
        </Container>
    );
};

export const Profile = withPrivateRoute(ProfileInner);
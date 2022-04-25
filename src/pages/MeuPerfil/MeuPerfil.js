import React, { useState, useCallback, useReducer } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { Alert, TitleRow, FormItemInput, ButtonRow, BottomNav } from '../../components';
import { Card, Container, Spacer } from '../../styles';
import { actions } from './reducers/actions';
import { initialState, reducer } from './reducers/reducer';

const MeuPerfil = ({ navigation }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [stop, setStop] = useState();
  const [user, setUser] = useState({
    name: '',
    birth: null,
    gender: '',
    email: '',
    phone: '',
    country: '',
    city: '',
  });

  const checkRequiredField = useCallback(() => {
    if(user.name === '' || user.email === '') {
      dispatch({type: actions.setMessage, payload: 'Os campos Nome e E-mail são obrigatórios e devem ser preenchidos para editar seu usuário!'});
      setStop(true);
      return dispatch({type: actions.showAlert, payload: true });
    } else {
      dispatch({type: actions.setMessage, payload: ''})
      setStop(false);
      return dispatch({type: actions.showAlert, payload: false });
    }
  }, [user.name, user.email, user.password, user.confirm, state, stop]);

  const handleConfirmButton = useCallback(() => {
      checkRequiredField();
      if (stop === false) {
        try {
          dispatch({type: actions.toggleLoading});
          dispatch({type: actions.setMessage, payload: 'Os campos Nome e E-mail são obrigatórios e devem ser preenchidos para editar seu usuário!'});
          dispatch({type: actions.showAlert, payload: true });
        } catch (error) {
          
        } finally {
          dispatch({type: actions.toggleLoading});
          setStop(null);
        }
      }
  }, [checkRequiredField])

  return (
    <SafeAreaView>
      <ScrollView>
        <Container bgColor="#085E7D">
          {state.alert && (<Alert message={state.message} onPress={() => dispatch({type: actions.showAlert, payload: false })} />)}
          <Card width="90%">
          <TitleRow text="Meu Perfil" />
            <FormItemInput
              required={true}
              placeholder="Nome"
              autoComplete="name"
              defaultValue={user.name ?? null}
              onChangeText={text => setUser({ ...user, name: text})}
              // iconName='account'
            />
            <Spacer />
            <FormItemInput
              placeholder="Data de Nascimento"
              autoComplete='birthdate-full'
              defaultValue={user.birth ?? null}
              onChangeText={text => setUser({ ...user, birth: text})}
            />
            <Spacer />
            <FormItemInput
              placeholder="Sexo"
              defaultValue={user.gender ?? null}
              autoComplete='gender'
              onChangeText={text => setUser({ ...user, gender: text})}
            />
            <Spacer />
            <FormItemInput
              required={true}
              placeholder="E-mail"
              defaultValue={user.email ?? null}
              autoComplete='email'
              onChangeText={text => setUser({ ...user, email: text})}
            />
            <Spacer />
            <FormItemInput
              placeholder="Telefone"
              autoComplete='tel'
              onChangeText={text => {setUser({ ...user, phone: text})}}
              // secureTextEntry
              // iconName="lock-outline"
            />
            <Spacer />
            <FormItemInput
              placeholder="País"
              onChangeText={text => setUser({ ...user, country: text})}
              // secureTextEntry
              // iconName="lock-outline"
            />
            <Spacer />
            <FormItemInput
              placeholder="Cidade"
              onChangeText={text => setUser({ ...user, city: text})}
              // secureTextEntry
              // iconName="lock-outline"
            />
            <Spacer />
            <ButtonRow
              text="Alterar"
              onPress={() => handleConfirmButton()}
              // iconName="check"
            />
            <ButtonRow
              text="Configurar Senha"
              onPress={() => navigation.navigate('Alterar Senha')}
              // iconName="check"
            />
          </Card>
        </Container>
        <BottomNav navigation={navigation}/>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MeuPerfil;
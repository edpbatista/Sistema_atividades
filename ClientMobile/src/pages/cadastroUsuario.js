import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';


export default function CadastroUsuario() {
  const [nome, setNome] = useState('');
  const [nomeDeUsuario, setNomeDeUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigation = useNavigation();

  const handleVoltar = () => {
    navigation.navigate('Home'); // Navega de volta para a tela inicial
  };

  const schema = Yup.object().shape({
    nome: Yup.string().required('O nome é obrigatório'),
    nomeDeUsuario: Yup.string().required('O usuário é obrigatório'),
    senha: Yup.string().required('A senha é obrigatória'),
  });

  const handleCadastro = async () => {
    try {
      await schema.validate({ nome, nomeDeUsuario, senha }, { abortEarly: false });

      // Se a validação for bem-sucedida, continuar com o cadastro

      // Fazer a requisição HTTP para cadastrar o usuário
      // Substitua a URL pela sua rota correta
      const response = await fetch('http://localhost:4003/usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
          nomeDeUsuario,
          senha,
        }),
      });

      console.log(response.data);
      // Exibir mensagem de sucesso
      setSuccessMessage('Cadastro realizado com sucesso!');
      setErrorMessage('');

      // Limpar os campos após o cadastro bem-sucedido
      setNome('');
      setNomeDeUsuario('');
      setSenha('');
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors = {};
        error.inner.forEach((e) => {
          validationErrors[e.path] = e.message;
        });
        setErrors(validationErrors);
      } else {
        console.error(error);
        // Exibir mensagem de erro
        setErrorMessage('Ocorreu um erro ao cadastrar. Por favor, tente novamente.');
        setSuccessMessage('');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Usuário</Text>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nome:</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={nome}
            onChangeText={setNome}
          />
        </View>
        <View style={styles.errorContainer}>
          {errors.nome && <Text style={styles.error}>{errors.nome}</Text>}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Usuário:</Text>
          <TextInput
            style={styles.input}
            placeholder="Usuário"
            value={nomeDeUsuario}
            onChangeText={setNomeDeUsuario}
          />
        </View>
        <View style={styles.errorContainer}>
          {errors.nomeDeUsuario && <Text style={styles.error}>{errors.nomeDeUsuario}</Text>}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Senha:</Text>
          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry={true}
            value={senha}
            onChangeText={setSenha}
          />
        </View>
        <View style={styles.errorContainer}>
          {errors.senha && <Text style={styles.error}>{errors.senha}</Text>}
        </View>
        {successMessage && <Text style={styles.successMessage}>{successMessage}</Text>}
        {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
        <TouchableOpacity style={styles.button} onPress={handleCadastro}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
        <br></br>
        <TouchableOpacity style={styles.button} onPress={handleVoltar}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  inputContainer: {
    width: '300px',
    padding: '10px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#f5f5f5f',
    marginBottom: '16px',
    fontSize: '14px'
  },
  errorContainer: {
    color: 'red',
    marginBottom: 8,
    fontSize: '14px'
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 4,
    backgroundColor: '#F5F5F5',
    marginBottom: 16,
    fontSize: 14,
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
  successMessage: {
    color: 'green',
    fontSize: 16,
    marginTop: 16,
  },
  errorMessage: {
    color: 'red',
    fontSize: 16,
    marginTop: 16,
  },
  button: {
    width: '300px',
    padding: '12px',
    borderRadius: 4,
    backgroundColor: '#222',
    marginBottom: '16px',
    fontSize: '14px',
  },
  buttonText: {
    color: '#f5f5f5',
    fontSize: 14,
    textAlign: 'center',
  },
  
});

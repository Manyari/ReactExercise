import React, { useState, useReducer } from 'react';

import { Form, Container, Button, Row, Modal } from 'react-bootstrap';
import './App.css';

import { initialState } from './constants';
import { actions } from './actions';
import { reducer } from './reducer';

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [Name, setName] = useState(false);
  const [Email, setEmail] = useState(false);
  const [Kilometers, setKilometers] = useState(false);
  const [Dates, setForm] = useState(false);

  const saveDate = (e) => {
    let { name, value } = e.target;

    if (value.length === 0) {
      setForm(true);
    } else {
      setForm(false);
    }
    if (value.length > 0) {
      if (name === 'name') {
        if (value.length === 0) {
          setName(true);
        } else {
          setName(false);
        }
      }

      if (name === 'email') {
        if (value.length === 0) {
          setEmail(true);
        } else {
          setEmail(false);
        }
      }

      if (name === 'kilometers') {
        if (value.length === 0) {
          setKilometers(true);
        } else {
          setKilometers(false);
        }
      }
    }
    dispatch({ type: actions.saveDate, name, payload: value });
  };
  
  const showModal = () => {
    dispatch({ type: actions.showModal });
  };
  const hideModal = () => {
    dispatch({ type: actions.toggleModal });
  };

  return (
    <Container className='header'>
      <Row className='justify-content-center'>
        <h1>Exercise Level</h1>
      </Row>
      <Form>
        <Form.Group controlId='formBasicEmail'>
          {Dates && <p className='required'>Porfavor llene todos los campos</p>}
          {Name && (
            <p className='required' style={{ color: 'red', fontSize: '11px' }}>
              Name is Required
            </p>
          )}
          <Form.Label>Name</Form.Label>
          <Form.Control
            name='name'
            type='name'
            onChange={saveDate}
            value={state.date.name}
            param={Name}
            placeholder='Enter name'
          />
        </Form.Group>

        <Form.Group controlId='formBasicPassword'>
          {Email && (
            <p className='required' style={{ color: 'red', fontSize: '11px' }}>
              Email is required
            </p>
          )}
          <Form.Label>Email</Form.Label>
          <Form.Control
            name='email'
            type='email'
            onChange={saveDate}
            value={state.date.email}
            param={Email}
            placeholder='Enter email'
          />
        </Form.Group>

        <Form.Group controlId='formBasicKilometer'>
          {Kilometers && (
            <p className='required' style={{ color: 'red', fontSize: '11px' }}>
              Kilometers is required
            </p>
          )}
          <Form.Label>Kilometers</Form.Label>
          <Form.Control
            name='kilometers'
            type='number'
            onChange={saveDate}
            value={state.date.kilometers}
            param={Kilometers}
            placeholder='Enter how many kilometers you walk per week'
          />
        </Form.Group>
      </Form>

      <Button onClick={() => showModal()}>
        <span className='pcoded-micon'>Submit</span>
      </Button>

      <Modal show={state.showModal} onHide={hideModal}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          {state.date.name}
          {state.date.kilometers >= 4
            ? 'Congratulations'
            : 'You must walk more'}
          {state.date.email}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={hideModal}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
export default App;

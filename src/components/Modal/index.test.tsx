import React from 'react';
import { render, within } from '@testing-library/react';
import Modal from '.';

test('modal shows the children (1)', () => {
  const { getByTestId } = render(
    <Modal>
      <div data-testid="test" />
    </Modal>
  );
  expect(getByTestId('test')).toBeInTheDocument();
});

test('modal shows the children (2)', () => {
  render(
    <Modal>
      <div data-testid="test" />
    </Modal>
  );
  const { getByTestId } = within(
    document.getElementById('modal-root') as HTMLElement
  );
  expect(getByTestId('test')).toBeInTheDocument();
});

test('modal shows the children (3)', () => {
  render(
    <>
      <div data-testid="foo" />
      <Modal>
        <div data-testid="test" />
      </Modal>
    </>
  );
  const { getByTestId, queryByTestId } = within(
    document.getElementById('modal-root') as HTMLElement
  );
  expect(queryByTestId('foo')).toBeNull();
  expect(getByTestId('test')).toBeInTheDocument();
});

test('modal shows the children (4)', () => {
  const { getByTestId } = render(
    <>
      <div data-testid="foo" />
      <Modal>
        <div data-testid="test" />
      </Modal>
    </>,
    { baseElement: document.getElementById('modal-root') as HTMLElement }
  );
  expect(getByTestId('test')).toBeInTheDocument();
});

test('modal shows the children (5) - Final', () => {
  render(
    <Modal>
      <div data-testid="test" />
    </Modal>
  );
  const { getByTestId } = within(
    document.getElementById('modal-root') as HTMLElement
  );
  expect(getByTestId('test')).toBeInTheDocument();
});

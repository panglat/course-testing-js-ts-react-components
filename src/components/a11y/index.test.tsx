import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import A11y from '.';

test('the form is accessible', async () => {
  const { container } = render(<A11y />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

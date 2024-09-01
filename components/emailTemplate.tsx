import { EmailTemplateProps } from '@/types';
import * as React from 'react';

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  message,
}) => (
  <div>
    <h1>Update From NexBud</h1>
    <p>{message}!</p>
  </div>
);

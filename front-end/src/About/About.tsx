import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card } from '../components';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

export function About() {
  return (
    <Card className="grid gap-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold">About</h1>
      <p>Made by Daan Brouwer</p>
      <a
        className="text-red-400"
        href="https://www.linkedin.com/in/dhwbrouwer/"
        target="_blank"
      >
        Linked In
      </a>
      <div className="flex items-center gap-4">
        <FontAwesomeIcon className="" icon={faPhone}></FontAwesomeIcon>
        <p>+31640185591</p>
      </div>
    </Card>
  );
}

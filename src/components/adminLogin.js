import React from "react";
import "../App.css";

import { useMediaQuery } from "react-responsive";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" width="836" height="579" viewBox="0 0 786 679" fill="none">
  <circle cx="514.5" cy="164.5" r="514.5" fill="#2BEA8E"/>
</svg>
`;
const svgContent2 = `<svg width="374" height="379" viewBox="0 0 374 379" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="93" cy="281" r="281" fill="#2BEA8E"/>
</svg>`;
const svgContent3 = `<svg width="157" height="197" viewBox="0 0 157 197" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="78.4502" cy="117.821" r="78.4502" fill="white"/>
<path d="M71.1591 165.051V80.6761H85.4773V165.051H71.1591ZM36.1307 130.023V115.705H120.506V130.023H36.1307Z" fill="#08DA75"/>
</svg>`;

const smallSvgContent3 = `<svg width="97" height="127" viewBox="0 0 157 197" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="78.4502" cy="117.821" r="78.4502" fill="white"/>
<path d="M71.1591 165.051V80.6761H85.4773V165.051H71.1591ZM36.1307 130.023V115.705H120.506V130.023H36.1307Z" fill="#08DA75"/>
</svg>`;

const smallsvg1 = `<svg width="310" height="223" viewBox="0 0 290 293" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="188" cy="105" r="188" fill="#2BEA8E"/>
</svg>
`;
const smallsvg2 = `<svg width="200" height="164" viewBox="0 0 225 194" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="37" cy="188" r="188" fill="#2BEA8E"/>
</svg>
`;

const svgContent4 = `<svg width="237" height="28" viewBox="0 0 237 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.0400001 27V1.24H11.2C13.8133 1.24 16.0133 1.68 17.8 2.56C19.5867 3.41333 20.9467 4.8 21.88 6.72C22.8133 8.61333 23.28
11.1333 23.28 14.28C23.28 18.7067 22.2533 21.9333 20.2 23.96C18.1733 25.9867 15.1733 27 11.2 27H0.0400001ZM6.48 22.04H10.32C11.7067
22.04 12.8667 21.84 13.8 21.44C14.76 21.0133 15.48 20.24 15.96 19.12C16.4667 18 16.72 16.3867 16.72 14.28C16.72 12.1467 16.4933 10.5067
16.04 9.36C15.6133 8.18667 14.92 7.37333 13.96 6.92C13.0267 6.44 11.8133 6.2 10.32 6.2H6.48V22.04ZM36.4434 27.4C32.7901 27.4 30.0968
26.56 28.3634 24.88C26.6301 23.1733 25.7634 20.72 25.7634 17.52C25.7634 14.3467 26.6301 11.9067 28.3634 10.2C30.1234 8.49333 32.8168
7.64 36.4434 7.64C40.0968 7.64 42.7901 8.49333 44.5234 10.2C46.2834 11.9067 47.1634 14.3467 47.1634 17.52C47.1634 20.72 46.2968 23.1733
 44.5634 24.88C42.8301 26.56 40.1234 27.4 36.4434 27.4ZM36.4434 22.36C37.9368 22.36 39.0034 21.9867 39.6434 21.24C40.2834 20.4933
 40.6034 19.2533 40.6034 17.52C40.6034 15.7867 40.2834 14.5467 39.6434 13.8C39.0034 13.0533 37.9368 12.68 36.4434 12.68C34.9768 12.68
 33.9234 13.0533 33.2834 13.8C32.6434 14.5467 32.3234 15.7867 32.3234 17.52C32.3234 19.2533 32.6434 20.4933 33.2834 21.24C33.9234
 21.9867 34.9768 22.36 36.4434 22.36ZM60.4306 27.4C57.044 27.4 54.3906 26.5733 52.4706 24.92C50.5773 23.2667 49.6306 20.8 49.6306
 17.52C49.6306 14.1867 50.6173 11.7067 52.5906 10.08C54.5906 8.45333 57.244 7.64 60.5506 7.64C61.9373 7.64 63.1373 7.74667 64.1506
 7.96C65.1906 8.14667 66.1906 8.46667 67.1506 8.92V13.48C65.6573 12.76 63.9106 12.4 61.9106 12.4C60.044 12.4 58.6173 12.7733 57.6306
 13.52C56.6706 14.2667 56.1906 15.6 56.1906 17.52C56.1906 19.3067 56.644 20.6133 57.5506 21.44C58.4573 22.24 59.8973 22.64 61.8706
 22.64C63.8173 22.64 65.5906 22.24 67.1906 21.44V26.2C66.2306 26.6267 65.1906 26.9333 64.0706 27.12C62.9773 27.3067 61.764 27.4 60.4306
 27.4ZM78.2697 27.4C75.923 27.4 74.1897 26.8 73.0697 25.6C71.9764 24.4 71.4297 22.7467 71.4297 20.64V12.92H68.8697V8.04H71.4297V4.08L77.8697 2.36V8.04H82.4697L82.1897 12.92H77.8697V20.2C77.8697 21.1067 78.0964 21.7467 78.5497 22.12C79.003 22.4667 79.683 22.64 80.5897 22.64C81.363 22.64 82.1497 22.5067 82.9497 22.24V26.6C81.6964 27.1333 80.1364 27.4 78.2697 27.4ZM95.3106 27.4C91.6573 27.4 88.964 26.56 87.2306 24.88C85.4973 23.1733 84.6306 20.72 84.6306 17.52C84.6306 14.3467 85.4973 11.9067 87.2306 10.2C88.9906 8.49333 91.684 7.64 95.3106 7.64C98.964 7.64 101.657 8.49333 103.391 10.2C105.151 11.9067 106.031 14.3467 106.031 17.52C106.031 20.72 105.164 23.1733 103.431 24.88C101.697 26.56 98.9906 27.4 95.3106 27.4ZM95.3106 22.36C96.804 22.36 97.8706 21.9867 98.5106 21.24C99.1506 20.4933 99.4706 19.2533 99.4706 17.52C99.4706 15.7867 99.1506 14.5467 98.5106 13.8C97.8706 13.0533 96.804 12.68 95.3106 12.68C93.844 12.68 92.7906 13.0533 92.1506 13.8C91.5106 14.5467 91.1906 15.7867 91.1906 17.52C91.1906 19.2533 91.5106 20.4933 92.1506 21.24C92.7906 21.9867 93.844 22.36 95.3106 22.36ZM109.298 27V8.04H115.418L115.618 9.8C116.444 9.29333 117.471 8.84 118.698 8.44C119.924 8.01333 121.151 7.74667 122.378 7.64V12.48C121.684 12.56 120.911 12.6933 120.058 12.88C119.231 13.04 118.431 13.24 117.658 13.48C116.911 13.72 116.271 13.9733 115.738 14.24V27H109.298ZM124.006 9.56L126.366 0.839998H131.806L128.846 9.56H124.006ZM140.322 27.4C138.802 27.4 137.362 27.2933 136.002 27.08C134.642 26.8667 133.562 26.6 132.762 26.28V21.36C133.696 21.76 134.776 22.0667 136.002 22.28C137.229 22.4933 138.322 22.6 139.282 22.6C140.429 22.6 141.256 22.5467 141.762 22.44C142.296 22.3333 142.562 22.04 142.562 21.56C142.562 21.0267 142.136 20.6267 141.282 20.36C140.429 20.0933 139.256 19.7067 137.762 19.2C136.029 18.5867 134.709 17.88 133.802 17.08C132.922 16.2533 132.482 15.04 132.482 13.44C132.482 11.5733 133.176 10.1467 134.562 9.16C135.976 8.14667 138.216 7.64 141.282 7.64C142.482 7.64 143.669 7.73333 144.842 7.92C146.016 8.10667 146.976 8.32 147.722 8.56V13.4C146.976 13.0533 146.122 12.8 145.162 12.64C144.202 12.48 143.336 12.4 142.562 12.4C141.576 12.4 140.736 12.4667 140.042 12.6C139.376 12.7067 139.042 12.9867 139.042 13.44C139.042 13.9467 139.416 14.3067 140.162 14.52C140.909 14.7067 141.989 15.0267 143.402 15.48C144.896 15.9333 146.056 16.4267 146.882 16.96C147.709 17.4667 148.296 18.08 148.642 18.8C148.989 19.52 149.162 20.4267 149.162 21.52C149.162 23.4133 148.416 24.8667 146.922 25.88C145.429 26.8933 143.229 27.4 140.322 27.4ZM166.977 27V6.2H159.417V1.24H180.977V6.2H173.417V27H166.977ZM187.171 27.4C185.971 27.4 184.851 27.1867 183.811 26.76C182.798 26.3333 181.984 25.68 181.371 24.8C180.758 23.8933 180.451 22.7733 180.451 21.44C180.451 19.4933 181.104 17.9733 182.411 16.88C183.744 15.76 185.731 15.2 188.371 15.2H193.651V14.76C193.651 13.8 193.331 13.12 192.691 12.72C192.051 12.2933 190.851 12.08 189.091 12.08C186.931 12.08 184.811 12.4133 182.731 13.08V8.92C183.664 8.54667 184.798 8.24 186.131 8C187.491 7.76 188.918 7.64 190.411 7.64C193.344 7.64 195.638 8.24 197.291 9.44C198.971 10.64 199.811 12.5467 199.811 15.16V27H194.171L193.851 25.4C193.158 26.04 192.264 26.5333 191.171 26.88C190.104 27.2267 188.771 27.4 187.171 27.4ZM189.211 23.44C190.224 23.44 191.104 23.2667 191.851 22.92C192.598 22.5733 193.198 22.1333 193.651 21.6V18.92H189.091C187.198 18.92 186.251 19.68 186.251 21.2C186.251 21.8933 186.491 22.44 186.971 22.84C187.451 23.24 188.198 23.44 189.211 23.44ZM209.513 27.4C207.433 27.4 205.939 26.9467 205.033 26.04C204.126 25.1333 203.673 23.68 203.673 21.68V0.039999H210.113V21.04C210.113 21.6533 210.233 22.08 210.473 22.32C210.739 22.5333 211.126 22.64 211.633 22.64C212.353 22.64 212.993 22.5467 213.553 22.36V26.72C212.939 26.96 212.326 27.1333 211.713 27.24C211.126 27.3467 210.393 27.4 209.513 27.4ZM215.978 27V0.039999H222.418V14.12L228.618 8.04H235.938L228.338 15.92L236.378 27H229.538L224.298 19.32L222.418 21.16V27H215.978Z" fill="white"/>
</svg>`;

const smallSvgContent4 = `<svg width="237" height="28" viewBox="0 0 237 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.0400001 27V1.24H11.2C13.8133 1.24 16.0133 1.68 17.8 2.56C19.5867 3.41333 20.9467 4.8 21.88 6.72C22.8133 8.61333 23.28
11.1333 23.28 14.28C23.28 18.7067 22.2533 21.9333 20.2 23.96C18.1733 25.9867 15.1733 27 11.2 27H0.0400001ZM6.48 22.04H10.32C11.7067
22.04 12.8667 21.84 13.8 21.44C14.76 21.0133 15.48 20.24 15.96 19.12C16.4667 18 16.72 16.3867 16.72 14.28C16.72 12.1467 16.4933 10.5067
16.04 9.36C15.6133 8.18667 14.92 7.37333 13.96 6.92C13.0267 6.44 11.8133 6.2 10.32 6.2H6.48V22.04ZM36.4434 27.4C32.7901 27.4 30.0968
26.56 28.3634 24.88C26.6301 23.1733 25.7634 20.72 25.7634 17.52C25.7634 14.3467 26.6301 11.9067 28.3634 10.2C30.1234 8.49333 32.8168
7.64 36.4434 7.64C40.0968 7.64 42.7901 8.49333 44.5234 10.2C46.2834 11.9067 47.1634 14.3467 47.1634 17.52C47.1634 20.72 46.2968 23.1733
 44.5634 24.88C42.8301 26.56 40.1234 27.4 36.4434 27.4ZM36.4434 22.36C37.9368 22.36 39.0034 21.9867 39.6434 21.24C40.2834 20.4933
 40.6034 19.2533 40.6034 17.52C40.6034 15.7867 40.2834 14.5467 39.6434 13.8C39.0034 13.0533 37.9368 12.68 36.4434 12.68C34.9768 12.68
 33.9234 13.0533 33.2834 13.8C32.6434 14.5467 32.3234 15.7867 32.3234 17.52C32.3234 19.2533 32.6434 20.4933 33.2834 21.24C33.9234
 21.9867 34.9768 22.36 36.4434 22.36ZM60.4306 27.4C57.044 27.4 54.3906 26.5733 52.4706 24.92C50.5773 23.2667 49.6306 20.8 49.6306
 17.52C49.6306 14.1867 50.6173 11.7067 52.5906 10.08C54.5906 8.45333 57.244 7.64 60.5506 7.64C61.9373 7.64 63.1373 7.74667 64.1506
 7.96C65.1906 8.14667 66.1906 8.46667 67.1506 8.92V13.48C65.6573 12.76 63.9106 12.4 61.9106 12.4C60.044 12.4 58.6173 12.7733 57.6306
 13.52C56.6706 14.2667 56.1906 15.6 56.1906 17.52C56.1906 19.3067 56.644 20.6133 57.5506 21.44C58.4573 22.24 59.8973 22.64 61.8706
 22.64C63.8173 22.64 65.5906 22.24 67.1906 21.44V26.2C66.2306 26.6267 65.1906 26.9333 64.0706 27.12C62.9773 27.3067 61.764 27.4 60.4306
 27.4ZM78.2697 27.4C75.923 27.4 74.1897 26.8 73.0697 25.6C71.9764 24.4 71.4297 22.7467 71.4297 20.64V12.92H68.8697V8.04H71.4297V4.08L77.8697 2.36V8.04H82.4697L82.1897 12.92H77.8697V20.2C77.8697 21.1067 78.0964 21.7467 78.5497 22.12C79.003 22.4667 79.683 22.64 80.5897 22.64C81.363 22.64 82.1497 22.5067 82.9497 22.24V26.6C81.6964 27.1333 80.1364 27.4 78.2697 27.4ZM95.3106 27.4C91.6573 27.4 88.964 26.56 87.2306 24.88C85.4973 23.1733 84.6306 20.72 84.6306 17.52C84.6306 14.3467 85.4973 11.9067 87.2306 10.2C88.9906 8.49333 91.684 7.64 95.3106 7.64C98.964 7.64 101.657 8.49333 103.391 10.2C105.151 11.9067 106.031 14.3467 106.031 17.52C106.031 20.72 105.164 23.1733 103.431 24.88C101.697 26.56 98.9906 27.4 95.3106 27.4ZM95.3106 22.36C96.804 22.36 97.8706 21.9867 98.5106 21.24C99.1506 20.4933 99.4706 19.2533 99.4706 17.52C99.4706 15.7867 99.1506 14.5467 98.5106 13.8C97.8706 13.0533 96.804 12.68 95.3106 12.68C93.844 12.68 92.7906 13.0533 92.1506 13.8C91.5106 14.5467 91.1906 15.7867 91.1906 17.52C91.1906 19.2533 91.5106 20.4933 92.1506 21.24C92.7906 21.9867 93.844 22.36 95.3106 22.36ZM109.298 27V8.04H115.418L115.618 9.8C116.444 9.29333 117.471 8.84 118.698 8.44C119.924 8.01333 121.151 7.74667 122.378 7.64V12.48C121.684 12.56 120.911 12.6933 120.058 12.88C119.231 13.04 118.431 13.24 117.658 13.48C116.911 13.72 116.271 13.9733 115.738 14.24V27H109.298ZM124.006 9.56L126.366 0.839998H131.806L128.846 9.56H124.006ZM140.322 27.4C138.802 27.4 137.362 27.2933 136.002 27.08C134.642 26.8667 133.562 26.6 132.762 26.28V21.36C133.696 21.76 134.776 22.0667 136.002 22.28C137.229 22.4933 138.322 22.6 139.282 22.6C140.429 22.6 141.256 22.5467 141.762 22.44C142.296 22.3333 142.562 22.04 142.562 21.56C142.562 21.0267 142.136 20.6267 141.282 20.36C140.429 20.0933 139.256 19.7067 137.762 19.2C136.029 18.5867 134.709 17.88 133.802 17.08C132.922 16.2533 132.482 15.04 132.482 13.44C132.482 11.5733 133.176 10.1467 134.562 9.16C135.976 8.14667 138.216 7.64 141.282 7.64C142.482 7.64 143.669 7.73333 144.842 7.92C146.016 8.10667 146.976 8.32 147.722 8.56V13.4C146.976 13.0533 146.122 12.8 145.162 12.64C144.202 12.48 143.336 12.4 142.562 12.4C141.576 12.4 140.736 12.4667 140.042 12.6C139.376 12.7067 139.042 12.9867 139.042 13.44C139.042 13.9467 139.416 14.3067 140.162 14.52C140.909 14.7067 141.989 15.0267 143.402 15.48C144.896 15.9333 146.056 16.4267 146.882 16.96C147.709 17.4667 148.296 18.08 148.642 18.8C148.989 19.52 149.162 20.4267 149.162 21.52C149.162 23.4133 148.416 24.8667 146.922 25.88C145.429 26.8933 143.229 27.4 140.322 27.4ZM166.977 27V6.2H159.417V1.24H180.977V6.2H173.417V27H166.977ZM187.171 27.4C185.971 27.4 184.851 27.1867 183.811 26.76C182.798 26.3333 181.984 25.68 181.371 24.8C180.758 23.8933 180.451 22.7733 180.451 21.44C180.451 19.4933 181.104 17.9733 182.411 16.88C183.744 15.76 185.731 15.2 188.371 15.2H193.651V14.76C193.651 13.8 193.331 13.12 192.691 12.72C192.051 12.2933 190.851 12.08 189.091 12.08C186.931 12.08 184.811 12.4133 182.731 13.08V8.92C183.664 8.54667 184.798 8.24 186.131 8C187.491 7.76 188.918 7.64 190.411 7.64C193.344 7.64 195.638 8.24 197.291 9.44C198.971 10.64 199.811 12.5467 199.811 15.16V27H194.171L193.851 25.4C193.158 26.04 192.264 26.5333 191.171 26.88C190.104 27.2267 188.771 27.4 187.171 27.4ZM189.211 23.44C190.224 23.44 191.104 23.2667 191.851 22.92C192.598 22.5733 193.198 22.1333 193.651 21.6V18.92H189.091C187.198 18.92 186.251 19.68 186.251 21.2C186.251 21.8933 186.491 22.44 186.971 22.84C187.451 23.24 188.198 23.44 189.211 23.44ZM209.513 27.4C207.433 27.4 205.939 26.9467 205.033 26.04C204.126 25.1333 203.673 23.68 203.673 21.68V0.039999H210.113V21.04C210.113 21.6533 210.233 22.08 210.473 22.32C210.739 22.5333 211.126 22.64 211.633 22.64C212.353 22.64 212.993 22.5467 213.553 22.36V26.72C212.939 26.96 212.326 27.1333 211.713 27.24C211.126 27.3467 210.393 27.4 209.513 27.4ZM215.978 27V0.039999H222.418V14.12L228.618 8.04H235.938L228.338 15.92L236.378 27H229.538L224.298 19.32L222.418 21.16V27H215.978Z" fill="white"/>
</svg>`;

export default function AdminLogin()
{
  let isTab = useMediaQuery({ query: "(max-width: 640px)" });
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [isAdmin, setIsAdmin] = useState(true);
  // const [email, setEmail] = useState("");
  // const [emailError, setEmailError] = useState("");

  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [emailOrUsernameError, setEmailOrUsernameError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

<<<<<<< HEAD
  const handleUsernameChange = (e) =>
  {
    const enteredUsername = e.target.value;
    setUsername(enteredUsername);

    // Regular expression pattern for username/email validation
    const usernamePattern = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

    if (!usernamePattern.test(enteredUsername))
    {
      setUsernameError("Please enter a valid username or email");
    } else
    {
      setUsernameError("");
=======
  const handleEmailOrUsernameChange = (e) => {
    const enteredValue = e.target.value;
    setEmailOrUsername(enteredValue);
    const emailOrUsernamePattern =
      /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailOrUsernamePattern.test(enteredValue)) {
      setEmailOrUsernameError("Please enter a valid email");
    } else {
      setEmailOrUsernameError("");
>>>>>>> 3029cfa370257f9bc1c6c2b45f3fc3ffa124c12a
    }
  };

  const handlePasswordChange = (e) =>
  {
    const enteredPassword = e.target.value;
    setPassword(enteredPassword);

    // Password validation
    if (enteredPassword.trim().length < 6)
    {
      setPasswordError("Password should be at least 6 characters");
    } else
    {
      setPasswordError("");
    }
  };
<<<<<<< HEAD
  const handleSubmit = async (e) =>
  {
    if (username === "")
    {
      setUsernameError("Username/Email should not be empty");
=======
  const handleSubmit = async (e) => {
    if (emailOrUsername === "") {
      setEmailOrUsernameError("Username/Email should not be empty");
>>>>>>> 3029cfa370257f9bc1c6c2b45f3fc3ffa124c12a
    }

    if (password === "")
    {
      setPasswordError("Password should not be empty");
    }

    e.preventDefault();
    if (isAdmin)
    {
      const response = await fetch(`${baseUrl}/api/v1/admin/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailOrUsername,
          password: password,
        }),
      });
      const data = await response.json();
      if (data.success === true)
      {
        if (data.token)
        {
          localStorage.setItem("token", data.token);
          navigate("/doctorlistadmin");
        }
      }
      if (data.success === false)
      {
        toast.error("Wrong Credentials", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else
      {
        toast.error("Validation failed", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }

      console.log(data);
    }
  };

  return (
    <>
      <div className="bg-customRed min-h-screen relative overflow-hidden">
        {!isTab ? (
          <>
            <div
              className="absolute sm:top-[-400px] sm:right-[-400px] md:top-[-200px] md:right-[-200px] lg:top-0 lg:right-0"
              dangerouslySetInnerHTML={{ __html: svgContent }}
            ></div>

            <div
              className="absolute bottom-0 left-0 sm:bottom-[-200px] sm:left-[-0px] md:bottom-[-150px] md:left-[-150px] lg:bottom-0 lg:left-0"
              dangerouslySetInnerHTML={{ __html: svgContent2 }}
            ></div>
          </>
        ) : (
          <>
            <div
              className="absolute top-0 right-0"
              dangerouslySetInnerHTML={{ __html: smallsvg1 }}
            ></div>
            <div
              className="absolute bottom-0 left-0"
              dangerouslySetInnerHTML={{ __html: smallsvg2 }}
            ></div>
          </>
        )}
        <div
          className="absolute z-10 flex flex-col justify-center items-center "
          style={{ right: 0, left: 0, margin: "0 auto" }}
        >
          {!isTab ? (
            <div dangerouslySetInnerHTML={{ __html: svgContent3 }}></div>
          ) : (
            <div
              className="my-20"
              dangerouslySetInnerHTML={{ __html: smallSvgContent3 }}
            ></div>
          )}

          {!isTab ? (
            <div
              className="my-4"
              dangerouslySetInnerHTML={{ __html: svgContent4 }}
            ></div>
          ) : (
            <div
              style={{ marginTop: -65, marginBottom: 20 }}
              dangerouslySetInnerHTML={{ __html: smallSvgContent4 }}
            ></div>
          )}

          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />

          <div
            className="rounded-full flex flex-row p-2 m-3 md:w-400 sm:w-300"
            style={{
              backgroundColor: "white",
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              width: isTab ? "180px" : "300px",
            }}
          >
            <span
              className={`rounded - full p - 2 pl - 10  cursor - pointer text-sm  bg-customRed text-white text-center`}
              style={{
                width: isTab ? "120%" : "90%",
                height: isTab ? "32px" : "40px",
                borderRadius: "25px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                fontSize: "18px",
              }}
            >
              Admin's Login
            </span>
          </div>
          <form className="flex flex-col ">
            <div className="flex flex-col items-center">
              <input
                className="outline-none border-b-2 m-4 text-white placeholder-white md:w-413 sm:w-300"
                style={{
                  height: "29px",
                  backgroundColor: "transparent",
                  fontFamily: "Lato, sans-serif",
                  fontWeight: 400,
                  fontSize: isTab ? "20px" : "24px",
                  lineHeight: "31.2px",
                }}
                type="text"
                placeholder="Username/Email"
<<<<<<< HEAD
                value={email}
                onChange={(e) =>
                {
                  setEmail(e.target.value);
                }}
=======
                value={emailOrUsername}
                onChange={handleEmailOrUsernameChange}
>>>>>>> 3029cfa370257f9bc1c6c2b45f3fc3ffa124c12a
              />
              {emailOrUsernameError && (
                <span style={{ color: "red", fontSize: "14px" }}>
                  {emailOrUsernameError}
                </span>
              )}
              <input
                className="outline-none border-b-2 m-4 text-white  placeholder-white md:w-413 sm:w-300"
                style={{
                  height: "29px",
                  backgroundColor: "transparent",
                  fontFamily: "Lato, sans-serif",
                  fontWeight: 400,
                  fontSize: isTab ? "20px" : "24px",
                  lineHeight: "31.2px",
                }}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                {
                  setPassword(e.target.value);
                }}
              />
              {passwordError && (
                <span style={{ color: "red", fontSize: "14px" }}>
                  {passwordError}
                </span>
              )}{" "}
            </div>
            <div className="flex justify-end md:w-413 sm:w-300">
              <button
                className="text-white cursor-pointer text-right font-light"
                style={{
                  width: "180px",
                  fontFamily: "Lato, sans-serif",
                  //fontWeight: 400,
                  fontSize: isTab ? "18px" : "20px",
                  lineHeight: "26.4px",
                  marginRight: isTab ? 10 : -20,
                }}
              >
                Forget Password?
              </button>
            </div>
            <div className="flex overflow-hidden md:w-413 sm:w-300">
              <input
                type="checkbox"
                className="form-checkbox mr-2 w-6 h-6 cursor-pointer "
                style={{
                  marginRight: isTab ? "6px" : "10px",
                }}
                id="myCheckbox"
              />
              <label
                className="text-white cursor-pointer"
                style={{ alignItems: "flex-start" }}
                htmlFor="myCheckbox"
              >
                <span
                  style={{
                    fontFamily: "Lato, sans-serif",
                    fontWeight: 400,
                    fontSize: isTab ? "18px" : "20px",
                    lineHeight: "28.8px",
                  }}
                >
                  Remember Me
                </span>
              </label>
            </div>
            <div className="flex justify-center">
              <button
                className="rounded-full mt-4 text-customRed"
                type="submit"
                style={{
                  backgroundColor: "white",
                  width: isTab ? "150px" : "198px",
                  height: isTab ? "35px" : "45px",
                  boxShadow: " 0 10px 5px -3px rgb(0 0 0 / 0.3)",
                }}
                onClick={handleSubmit}
              >
                Sign In
              </button>
            </div>
            <div className="flex justify-center text-white font-bold gap-2 mt-4">
              <p
                style={{
                  fontFamily: "Lato, sans-serif",
                  fontWeight: 400,
                  fontSize: isTab ? "14px" : "18px",
                  lineHeight: "24px",
                }}
              >
                Need An Account?
              </p>
              <button
                type="submit"
                style={{
                  fontFamily: "Lato, sans-serif",
                  fontWeight: 900,
                  fontSize: isTab ? "14px" : "18px",
                  lineHeight: "24px",
                }}
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

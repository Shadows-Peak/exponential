const myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer patFPAzk3Ni4jtL7K.8bdcda86e17b32bd177f9ab25661e401e4454a8e4a2401a267c36b67e94ea933");
myHeaders.append("Cookie", "brw=brwtcGK1QAbqebbws; brwConsent=opt-in; AWSALBTG=EpkY/q0Hq3VSK8qnomAvKdg9K6da5H5nbO/zWFffwoI3eAyEyaq+4+PDG6EeApy8do/5h5Kr5OgIuKMv5tUpzEJlKq11AYELuW1YlnOChNL1YnvSMpyaALCymO/3VVIDcDdOi+eoLE4x+aVzfAXl6aWRlYiIl3Dck2Pxoxhm1qfdJvRBTcM=; AWSALBTGCORS=EpkY/q0Hq3VSK8qnomAvKdg9K6da5H5nbO/zWFffwoI3eAyEyaq+4+PDG6EeApy8do/5h5Kr5OgIuKMv5tUpzEJlKq11AYELuW1YlnOChNL1YnvSMpyaALCymO/3VVIDcDdOi+eoLE4x+aVzfAXl6aWRlYiIl3Dck2Pxoxhm1qfdJvRBTcM=");

const raw = "";

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://api.airtable.com/v0/appXXbVu5p4uSKViT/logins", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  const users = result

import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  // Check if the method is POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Get the username and password from the request body
  const { username, password } = req.body;

  // Find the user by username
  const user = users.find(user => user.username === username);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Compare the provided password with the stored hash
  const isMatch = await bcrypt.compare(password, user.passwordHash);

  if (isMatch) {
    return res.status(200).json({ message: 'Login successful' });
  } else {
    return res.status(401).json({ message: 'Invalid password' });
  }
}

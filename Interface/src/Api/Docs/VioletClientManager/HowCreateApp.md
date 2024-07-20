# How to Create an Application?

## Step 1
Ensure that the version of the VioletClientManager library has the - Stable or Release flag.

Example 

```md
Version of VioletClientManager = 1.000.00-Stable
```

## Step 2
Create a directory with the name of your application in the Apps directory at 
```
./src/Apps
```

## Step 3
Create a file with the name of your application in the Apps directory with the extension .jsx or .tsx. For customizing your application, create a file with the same name and a .css extension.

Example
```md
/Apps
- Calc.jsx
- Calc.css
- logo.svg
- info.json
```

## Step 4
Connect the WindowManager.jsx from ./Api/Libs/VioletClientManager/Core/Managers/Windows.

Example of your application:
```jsx
import React, { useState } from 'react';
import WindowManager from '../../Api/Libs/VioletClientManager/Core/Managers/Windows/WindowManager';
import "./style.css"

const TodoApp = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const Open =() => {
    setIsOpen(true);
  }

  return (
    <>
    // DESKTOP ICON
        <div>
            <button onClick={Open} className="App--Icon">
            <img src="APPLICATION ICON"/>
            </button>
        </div>

        // OPEN APPLICATION

      {isOpen && (
        <WindowManager title="APPLICATION NAME" onClose={handleClose}>
          <div className="">

            YOUR APPLICATION

          </div>
        </WindowManager>
      )}
    </>
  );
};

export default TodoApp;
```

## Step 5
Is your application ready? Then it needs to be connected. The method of connection is currently working as a workaround, so I apologize for any inconvenience.

Go to the system components and edit the DesktopApps.jsx file by adding your application to the list.
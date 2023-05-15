import React, { useState, useRef, useEffect } from "react";

type User = {
  value: string;
};

const userList: User[] = [
  { value: "@User1" },

  { value: "@User2" },

  { value: "@User3" },
];

const UserSearch: React.FC = () => {
  const [searchedUsers, setSearchedUsers] = useState<User[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    if (value.startsWith("@")) {
      setShowDropdown(true);
      setFilteredUsers(
        userList.filter((user) =>
          user.value.toLowerCase().includes(value.slice(1).toLowerCase())
        )
      );
    } else {
      setShowDropdown(false);
    } 
  };

  const handleUserSelect = (user: User) => {
    setSearchedUsers([...searchedUsers, user]);
    setInputValue("");
    setShowDropdown(false);
  };

  return (
    <>
      <div className="flex-grow items-center bg-violet-200 pl-20 text-2xl">
        <input
          ref={inputRef}
          value={inputValue}
          onChange={handleInputChange}
          type="text"
          placeholder="search for users..."
        />
        {showDropdown && (
          <div className="dropdown">
            {filteredUsers.map((user) => (
              <div key={user.value} 
              className="dropdown-item"
              onClick={() => handleUserSelect(user)}>
                {user.value}
              </div>
            ))}
          </div>
     
        )}
        <ul>
          {searchedUsers.map((user) => (
            <li key={user.value}>{user.value}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default UserSearch;


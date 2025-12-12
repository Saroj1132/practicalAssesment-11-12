# Manual Test Scenarios

## 🔐 Authentication Tests

### 1. User Signup
```bash
# ✅ Valid Signup
curl -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"testuser@example.com","password":"password123"}'

# ❌ Duplicate Email
curl -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"testuser@example.com","password":"password123"}'

# ❌ Invalid Email
curl -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"invalid-email","password":"password123"}'

# ❌ Short Password
curl -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test2@example.com","password":"123"}'
```

### 2. User Login
```bash
# ✅ Valid Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"testuser@example.com","password":"password123"}'

# ❌ Wrong Password
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"testuser@example.com","password":"wrongpass"}'

# ❌ Non-existent User
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"notfound@example.com","password":"password123"}'
```

## 🎮 Games API Tests

**Note: Replace YOUR_JWT_TOKEN with actual token from login response**

### 3. Add New Games
```bash
# ✅ Valid Game Creation
curl -X POST http://localhost:3000/games \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"New Game","platform":"PC","score":8.5,"genre":"Action","editors_choice":true}'

# ❌ Without Authentication
curl -X POST http://localhost:3000/games \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Game","platform":"PC","score":8.0,"genre":"Action"}'

# ❌ Invalid Score (>10)
curl -X POST http://localhost:3000/games \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Bad Game","platform":"PC","score":15,"genre":"Action"}'

# ❌ Missing Required Fields
curl -X POST http://localhost:3000/games \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"","platform":"PC","score":8.0}'
```

### 4. Search Games
```bash
# ✅ Search by Title
curl -X GET "http://localhost:3000/games/search?title=Pokemon" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# ✅ Search No Results
curl -X GET "http://localhost:3000/games/search?title=NonExistent" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# ❌ Search Without Auth
curl -X GET "http://localhost:3000/games/search?title=Pokemon"
```

### 5. Get All Games with Filters
```bash
# ✅ Get All Games
curl -X GET http://localhost:3000/games \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# ✅ Filter by Platform
curl -X GET "http://localhost:3000/games?platform=PC" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# ✅ Filter by Genre
curl -X GET "http://localhost:3000/games?genre=RPG" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# ✅ Filter by Editors Choice
curl -X GET "http://localhost:3000/games?editors_choice=true" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# ✅ Sort by Score (Descending)
curl -X GET "http://localhost:3000/games?sortBy=score&sortOrder=desc" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# ✅ Sort by Score (Ascending)
curl -X GET "http://localhost:3000/games?sortBy=score&sortOrder=asc" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# ✅ Multiple Filters
curl -X GET "http://localhost:3000/games?platform=PC&genre=Action&sortBy=score&sortOrder=desc" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# ❌ Without Authentication
curl -X GET http://localhost:3000/games
```

### 6. Update Games
```bash
# ✅ Update Single Property
curl -X PATCH http://localhost:3000/games/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"score":9.5}'

# ✅ Update Multiple Properties
curl -X PATCH http://localhost:3000/games/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"platform":"PlayStation 5","genre":"Adventure","editors_choice":false}'

# ❌ Update Without Auth
curl -X PATCH http://localhost:3000/games/1 \
  -H "Content-Type: application/json" \
  -d '{"score":8.0}'

# ❌ Update Non-existent Game
curl -X PATCH http://localhost:3000/games/999 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"score":8.0}'

# ❌ Invalid Score Update
curl -X PATCH http://localhost:3000/games/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"score":15}'
```

### 7. Delete Games
```bash
# ✅ Delete Game
curl -X DELETE http://localhost:3000/games/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# ❌ Delete Without Auth
curl -X DELETE http://localhost:3000/games/2

# ❌ Delete Non-existent Game
curl -X DELETE http://localhost:3000/games/999 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 8. Get Single Game
```bash
# ✅ Get Existing Game
curl -X GET http://localhost:3000/games/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# ❌ Get Without Auth
curl -X GET http://localhost:3000/games/1

# ❌ Get Non-existent Game
curl -X GET http://localhost:3000/games/999 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 📊 Expected Results

### Success Responses
- **200**: OK (GET, PATCH, DELETE)
- **201**: Created (POST)
- **JWT Token**: Contains access_token and user info

### Error Responses
- **400**: Bad Request (Validation errors)
- **401**: Unauthorized (Missing/invalid token)
- **404**: Not Found (Game doesn't exist)
- **409**: Conflict (Duplicate email)
- **500**: Internal Server Error

## 🧪 Testing Tips

1. **Get JWT Token First**: Always login and copy the access_token
2. **Replace YOUR_JWT_TOKEN**: Use actual token in Authorization header
3. **Check Response Codes**: Verify expected HTTP status codes
4. **Test Edge Cases**: Try invalid data, missing fields, etc.
5. **Verify Data**: Check if updates/deletes actually worked

## 📝 Test Checklist

- [ ] User can signup with valid data
- [ ] Duplicate email signup fails
- [ ] User can login with correct credentials
- [ ] Wrong password login fails
- [ ] Can create games with valid data
- [ ] Cannot access games without token
- [ ] Can search games by title
- [ ] Can filter games by platform/genre/editors_choice
- [ ] Can sort games by score (asc/desc)
- [ ] Can update game properties
- [ ] Can delete games
- [ ] All validation rules work
- [ ] All error cases return proper status codes
# / -> homepage

search by title
tampilkan list category => show photo by category(click category)
tampilkan list photo order by recent upload => thumbnail photo(photo di tampilkan lebih kecil dari aslinya)

# /register -> user registration (form) (DONE)

syarat sesuai ERD punya Users
{username, email, password, role:user(false) by default}

# /login -> user login (DONE)

checkStatus apakah dia user terdaftar / tidak.

by default enggak ada tombol vote

- tapi masih bisa nambah view

kalau role == false => (user) maka

- bisa vote
- bisa nambah view
- bisa delete photo sendiri

kalau role == true => (admin) maka

- ga bisa vote
- ga nambah view
- bisa delete photo sendiri & orang lain (moderation)

---

/photo/:id -> photo page
tampilkan photo full resolusi
tampilkan category
detail photo
-user/profile (tampilan nama username, kalau di klik masuk --ke-> /profile/:id
-title
-image url
-mau ada likes (?) default 0
-mau ada views (?) default 0

---

/profile/:id -> User page
tampilkan photo per usernya order by recent upload
-nama profile/user
-bio
-total Likes gathered(?)
-total Views gathered(?)
-upload photo

-profile pic (?)

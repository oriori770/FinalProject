FROM node:20-slim AS build
# מגדיר את תיקיית העבודה בקונטיינר ל/-app
# כל הפקודות הבאות יתבצעו בתיקייה זו
WORKDIR /app
# מעתיק רק את קבצי json.package ו-json.lock-package תחילה
# זה נעשה בנפרד מהעתקת שאר הקבצים כדי לנצל את המטמון של Docker
# אם קבצים אלו לא השתנו, Docker ישתמש בגרסה שמורה במטמון של התלויות
COPY package*.json ./
# מתקין את כל חבילות ה-npm המוגדרות ב-json.package
RUN npm install
# מעתיק את כל שאר קבצי הפרויקט לתיקיית העבודה
COPY . .
# מריץ את פקודת הבנייה של הפרויקט
# פקודה זו יוצרת את הקבצים הסטטיים בתיקיית dist
RUN npm run build
# מתחיל שלב חדש בדוקרפייל, משתמש ב-nginx על Linux Alpine
# nginx הוא שרת web קל ויעיל שישמש להגשת הקבצים הסטטיים שלנו
FROM nginx:alpine
# מעתיק את הקבצים שנבנו בשלב ה-build ( מתיקיית dist) 
# לתיקיית ברירת המחדל של nginx להגשת קבצים
COPY --from=build /app/dist /usr/share/nginx/html
# מציין שהקונטיינר יחשוף את פורט 80 )פורט ברירת המחדל של HTTP)
EXPOSE 80
# מפעיל את שרת ה-nginx
# off daemon מציין שה-nginx ירוץ בחזית )foreground )ולא כתהליך רקע
CMD ["nginx", "-g", "daemon off;"]
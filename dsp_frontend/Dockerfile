# ---------- Stage 1: Build the React app ----------
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies first (leverage Docker layer caching)
COPY package.json /app/package.json
# If lockfile exists in your project, uncomment the next line to improve reproducibility
# COPY package-lock.json /app/package-lock.json

# Install deps (no dev container caching issues)
RUN npm ci --quiet || npm install --quiet

# Copy source
COPY . /app

# Build-time ARGs to pass REACT_APP_* variables (documenting a common one)
# Provide default empty values; they can be overridden at build time:
# docker build --build-arg REACT_APP_API_BASE_URL=http://localhost:8000 -t dsp-frontend .
ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=${REACT_APP_API_BASE_URL}

# Build the production bundle
RUN npm run build

# ---------- Stage 2: Nginx to serve static files ----------
FROM nginx:alpine AS runtime

# Copy build output to Nginx html directory
COPY --from=builder /app/build /usr/share/nginx/html

# Replace default Nginx config to support SPA routing and listen on 3000
# We configure a simple server that:
# - Listens on 3000 by default (matching local dev expectations)
# - Uses try_files to route unknown paths to index.html for client-side routing
RUN rm -f /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 3000 (change to 80 if your environment expects :80)
EXPOSE 3000

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]

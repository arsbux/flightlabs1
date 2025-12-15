-- RUN THIS IN SUPABASE SQL EDITOR TO MAKE POSTS PUBLIC
-- Access: https://supabase.com/dashboard/project/_/sql/new

-- 1. Enable RLS (Good practice, even if you want public)
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- 2. Create a policy that allows ANYONE to Select, Insert, Update, Delete
-- This makes the table effectively "unrestricted" while keeping RLS enabled for future tweaks.
CREATE POLICY "Public Access"
ON posts
FOR ALL
USING (true)
WITH CHECK (true);

-- 3. (Optional) Make Storage Bucket Public for Images
-- This allows anyone to view images, and anyone (anon) to upload.
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

CREATE POLICY "Public Storage Access"
ON storage.objects
FOR ALL
USING ( bucket_id = 'images' )
WITH CHECK ( bucket_id = 'images' );

"use client"

import React, { useEffect, useState } from 'react';
import { Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import Image from 'next/image';
import { AWS_BUCKET_IMAGE_URL } from '../config';
import ImageModel from '@/models/image-model';
import Search from '@/components/search';

const ImageGalleryPage = () => {
    const [view, setView] = useState<'grid' | 'list'>('grid');
 const [images, setImages] = useState<ImageModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

    const toggleView = () => {
      setView(view === 'grid' ? 'list' : 'grid');
    };

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('/api/images');
                setImages(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des images:', error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchImages();
        
    }, []);
    return ( 
        <div className='flex flex-col gap-4'>
          <Search />
          <h1 className='flex text-2xl font-semibold items-center justify-center'>
            Image Gallery
          </h1>
          <div className="flex justify-end">
              <Button onClick={toggleView}>
                  {view === 'grid' ? <List /> : <Grid />}
              </Button>
          </div>

          {loading ? (
            <p>Chargement des images...</p>
            ) : (
              <div className={view === 'grid' ? 'grid grid-cols-3 gap-4' : 'space-y-4'}>
                  
                {images.map((image) => (
                  
                  <div
                    key={image.name}
                    className=" border p-4 rounded-md shadow hover:shadow-lg transition">
                    <Image
                      src={ AWS_BUCKET_IMAGE_URL + image.name}
                      priority= {true}
                      alt={image.name}
                      width={50}
                      height={100}
                      className="w-full h-32 object-cover rounded-md mb-2"
                    />
                    <div>
                      <p className="truncate font-semibold">{image.name}</p>
                      <p className="text-sm text-gray-500">
                        {(image.size / 1024).toFixed(2)} KB
                      </p>
                      <p className="text-sm text-gray-500">
                        Modifié le : {new Date(image.lastModified).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
        </div>
     );
}
 
export default ImageGalleryPage;
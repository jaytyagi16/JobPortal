import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "Frontend Developer", "Backend Developer", "Data Analyst", "Graphic Designer", "Full Stack Developer", "Devops Engineer"
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  }

  return (
    <div className="w-full max-w-xl mx-auto my-20">
      <Carousel className="w-full">
        <CarouselContent>
          {
            category.map((cat, index) => (
              <CarouselItem 
                key={index}
                className="md:basis-1/2 lg:basis-1/3" // Ensuring the width of each item is fixed
              >
                <Button onClick={() => searchJobHandler(cat)} variant="outline" className="rounded-full">{cat}</Button>
              </CarouselItem>
            ))
          }
        </CarouselContent>
        <CarouselPrevious/>
        <CarouselNext/>
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
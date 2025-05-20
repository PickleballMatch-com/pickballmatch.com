'use client';

import { Button } from '@/components/common/Button';
import { Card, CardContent, CardTitle } from '@/components/common/Card';
import { Container } from '@/components/common/Container';
import { PageHeader } from '@/components/common/PageHeader';
import { Section } from '@/components/common/Section';
import { Footer } from '@/components/navigation/Footer';
import { Navbar } from '@/components/navigation/Navbar';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Navbar transparent />
      
      {/* Hero Section */}
      <Section background="white" className="pt-20 pb-24">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
              Find Your Perfect <span className="bg-black text-primary px-2 py-1 rounded-md">Pickleball</span> Partner
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Connect with players at your skill level, find tournament partners, meet locals when you travel, and build your pickleball community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg">
                Get Started Free
              </Button>
              <Button variant="secondary" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </Container>
      </Section>
      
      {/* Features Section */}
      <Section background="light">
        <Container>
          <PageHeader
            title="Everything You Need to Play"
            align="center"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center text-2xl mb-5 mx-auto">
                  🎯
                </div>
                <CardTitle className="mb-3">Smart Matching</CardTitle>
                <p className="text-gray-600">
                  Find players at your exact skill level using DUPR ratings and smart filters. Swipe to connect with local players instantly.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center text-2xl mb-5 mx-auto">
                  ✈️
                </div>
                <CardTitle className="mb-3">Travel & Play</CardTitle>
                <p className="text-gray-600">
                  Traveling for work or pleasure? Connect with local players before you arrive. Never miss a game on the road.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center text-2xl mb-5 mx-auto">
                  🏆
                </div>
                <CardTitle className="mb-3">Tournament Partners</CardTitle>
                <p className="text-gray-600">
                  Find the perfect partner for your next tournament. Browse by skill level, playing style, and tournament goals.
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>
      
      {/* How It Works Section */}
      <Section background="white">
        <Container>
          <PageHeader
            title="How It Works"
            align="center"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-black text-primary flex items-center justify-center text-xl font-bold mx-auto mb-5">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">Create Your Profile</h3>
              <p className="text-gray-600">
                Add your DUPR rating, playing style, and what you're looking for in a partner.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-black text-primary flex items-center justify-center text-xl font-bold mx-auto mb-5">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">Browse & Match</h3>
              <p className="text-gray-600">
                Swipe through potential partners, filter by skill level, and build your reach-out list.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-black text-primary flex items-center justify-center text-xl font-bold mx-auto mb-5">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">Connect & Play</h3>
              <p className="text-gray-600">
                Message matches, schedule games, and grow your pickleball network.
              </p>
            </div>
          </div>
        </Container>
      </Section>
      
      {/* CTA Section */}
      <Section background="dark">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Find Your Next Partner?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Join thousands of pickleball players already connecting on Pickleball Match
            </p>
            <Button variant="primary" size="lg">
              Get Started Free
            </Button>
          </div>
        </Container>
      </Section>
      
      {/* Footer */}
      <Footer />
    </>
  );
}
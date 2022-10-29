import React from 'react'
import Layout from '../components/layout.js'

const About = () => (
  <Layout>
    <div className="container w-3/4 mx-auto">
      <h1 className="mt-8 text-4xl font-bold">About Me</h1>
      <p className="mt-8 text-xl">A dude walking and sometimes climbing</p>
      <p className="mt-16">
        <blockquote>Climb the mountains and get their good tidings. Nature’s peace will
          flow into you as sunshine flows in to trees. The winds will blow their own freshness into you,
          and the storms their energy, while cares will drop off like autumn leaves. - John Muir
        </blockquote>
      </p>
    </div>
  </Layout>
);

export default About;

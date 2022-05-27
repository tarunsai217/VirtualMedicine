import React,{useState,useEffect} from 'react'
import styles from './Home.module.css'
import ent from '../../assets/ent.svg'
import general from '../../assets/general.svg'
import operation from '../../assets/operation.svg'
import pulmonology from '../../assets/pulmonology.svg'


function Home() {
  
  return (
    <div className={styles.container}>
      <div className={styles.topContainer}> 
            
            <div className={styles.about}> 
               <h1>Virtual Medicine</h1>
               <p>Choose the experts in end to end surgical care</p>
               <h4>You are in safe hands </h4>
            </div>
            
            <div className={styles.services}>
              <div className={styles.serviceCard}> 
                   <div className={styles.serviceImageContainer}>
                    <img src='https://www.practostatic.com/consumer-home/desktop/images/1597423628/dweb_instant_video_consulation.png' />   
                   </div>
                   <div className={styles.serviceDescription}>
                   <h3>Instant video consulation</h3>
                   <p> Connect within 60 seconds</p>
                   </div>
                   
              </div>

              <div style={{backgroundColor:'#98CBD6'}} className={styles.serviceCard}> 
                   <div className={styles.serviceImageContainer}>
                    <img src='https://www.practostatic.com/consumer-home/desktop/images/1597423628/dweb_find_doctors.png' />   
                   </div>
                   <div className={styles.serviceDescription}>
                   <h3>Find Doctors near you</h3>
                   <p> Confirmed Appointments</p>
                   </div>
              </div>

              <div  style={{backgroundColor:'#D5D8FC'}} className={styles.serviceCard}> 
                   <div className={styles.serviceImageContainer}>
                   <img src='https://www.practostatic.com/consumer-home/desktop/images/1597423628/dweb_surgeries.png' />   
                   </div>
                   <div className={styles.serviceDescription}>
                   <h3>Surgeries</h3>
                   <p> Safe and Trusted</p>
                   </div>
              
              </div>

              <div style={{backgroundColor:'#AFCFED'}} className={styles.serviceCard}> 
                   <div className={styles.serviceImageContainer}>
                   <img src='https://www.practostatic.com/consumer-home/desktop/images/1597423628/dweb_lab_tests.png' />   
                   </div>
                   <div className={styles.serviceDescription}>
                   <h3>Lab Tests</h3>
                   <p> Fast and Reliable</p>
                   </div>
                
              </div>

            </div>


            <div className={styles.specialisationWrapper}> 
              <h3>Consult top doctors for any concern</h3>
              <div className={styles.specialisation}>
                 <div className={styles.imageWrapper}> 
                 <img src={operation}/>
                 <p> Operations</p>
                 </div>
                 <div className={styles.imageWrapper}> 
                 <img src={general}/>
                 <p> General</p>
                 </div>
                 <div className={styles.imageWrapper}> 
                 <img src={pulmonology}/>
                 <p> Pulmonologist</p>
                 </div>
                 <div className={styles.imageWrapper}> 
                 <img src={ent}/>
                 <p> ENT</p>
                 </div>     
            </div>
            </div>



            
            
            <div className={styles.articles}> 
               <div className={styles.articlesIntro}>
                    <div> 
                    <h3>Read top articles from health experts</h3>
                    <p>Health articles that keep you informed about good health practices.</p>
                    </div> 
                    <button>See all articles</button>
               </div>
                <div className={styles.articleWrapper}> 
                    
                       <div className={styles.article}> 
                        <img src='https://www.practostatic.com/fit/5fd27b74d9477cb633445cf3f105078bbc479910' /> 
                        <p className={styles.articleHeading}> Coronavirus</p>
                        <p className={styles.articleTitle}> 12 Coronavirus Myths and Facts That You Should Be Aware Of</p>
                        <p className={styles.articleAuthor}>Dr.Diana Borgio </p>
                      </div>
                     


                      <div className={styles.article}> 
                        <img src='https://www.practostatic.com/fit/bade52edc7fb158bf627216bf96c2b881a97f30c' /> 
                        <p className={styles.articleHeading}> Vitamins and Supplements</p>
                        <p className={styles.articleTitle}> Eating Right to Build Immunity Against Cold and Viral Infections</p>
                        <p className={styles.articleAuthor}>Dr.Diana Borgio </p>
                      </div>
                </div>
               

            </div>



            <div className={styles.reviews}>
              <p>What our users have to say</p>
               <div id="#carouselExampleControls" className="carousel slide" data-ride="carousel">
                  {/* <ol class="carousel-indicators">
                    <li data-target="#carouselExampleIndicators bg-dark" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselExampleIndicators bg-dark" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators bg-dark" data-slide-to="2"></li>
                  </ol> */}
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <card className={styles.reviewCard}> 
                      <div>
                        <p className={styles.review}> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                        <p className={styles.reviewer}> -Leena Mehta </p>
                      </div>
                      </card>
                    </div>
                    <div className="carousel-item">
                      
                      <card className={styles.reviewCard}> 
                      <div>
                        <p className={styles.review}> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                        <p className={styles.reviewer}> --Leena Mehta </p>
                      </div>
                      </card>
                    </div>
                    <div className="carousel-item">
                      <card className={styles.reviewCard}> 
                      <div>
                        <p className={styles.review}> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.  </p>
                        <p className={styles.reviewer}> ---Leena Mehta </p>
                      </div>
                      </card>
                    </div>
                  </div>
                  <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span  className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only text-dark">Previous</span>
                  </a>
                  <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span  className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only text-dark">Next</span>
                  </a>
               </div>
              </div>


            
            
      </div>
      
      
      <footer>
         <div className={styles.footerColumnContainer}>
           <div className={styles.footerColumns}> 
           <p className={styles.footerHeading}> Virtual Medicine</p>
             <ul> 
               <li>About</li>
               <li>Blog</li> 
               <li>Careers</li>
               <li>Press </li>               
               <li> Contact Us</li>
             </ul>
           </div>
           <div className={styles.footerColumns}>
           <p className={styles.footerHeading}>Our Partners </p>
             <ul> 
               <li><a>Ray </a></li>
               <li><a>Insta </a></li> 
               <li><a>Quikwell </a></li>
               <li><a>Smartree </a> </li>              
             </ul>
           </div>

           <div className={styles.footerColumns}> 
           <p className={styles.footerHeading}> More</p>
             <ul> 
               <li>Help</li>
               <li>Developers</li> 
               <li>Privacy Policy</li>
               <li>Terms and Conditions</li>               
               <li> Healthcare Directory</li>
             </ul>
           </div>

           <div className={styles.footerColumns}> 
           <p className={styles.footerHeading}> Social </p>
             <ul> 
               <li>Facebook</li>
               <li>Linkedin</li> 
               <li>Youtube</li>
               <li>Twitter</li>               
               <li>Github</li>
             </ul>
           
           </div>

         </div>
         <div className={styles.copyright}>
         <h1>Virtual Medicine</h1>
         <span>Copyright © 2022, Virtual Medicine. </span>
         <span> All rights reserved.</span>  
         </div>
         
      </footer>
    </div>
  )
}

export default Home